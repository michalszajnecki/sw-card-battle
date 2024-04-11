<script setup lang="ts">
import { useBattleData } from '../stores/battleData';
import { useUserData } from '../stores/userData';
import { generateCardData, getCardForComputerPlayer, buildDeckForPlayer } from '../../services/generateCardData';
import { onDeactivated, onMounted, ref, computed, nextTick } from 'vue';
useHead({
  title: 'Battle'
})
definePageMeta({
  layout: 'game',
  middleware: [
    'auth'
  ]
});
const battleDataStore = useBattleData()
const userDataStore = useUserData()
const route = useRoute()

const battleResource = ref(battleDataStore.resource)
const enemyStatus = ref(battleDataStore.enemyStatus)
const room = ref()
const showEnemyDeck = ref(false)
const canChooseCard = ref(false)
const userDeckForSelectedResource = computed(() => {
  return buildDeckForPlayer(battleDataStore.resource)
})

const currentBattleStats = ref({ enemyWon: 0, userWon: 0 })

const timeSpentInRoom = ref(0)
const enemyCard = ref()
const selectedCard = ref()
let timeInterval;

const showBattleEndScreen = ref(false)
const battleResult = ref(true)
const usedCards: string[] = []

const { user, registerUser, loginUser } = useFirebaseAuth()
const { addNewUserData, getUserData, updateUserData, observeRoomStatus, getRoomData, updateGameRoomCard, clearGameRoomCards, removeRoom } = useFirestoreDatabase()



async function selectCard(card) {
  usedCards.push(card.uid)
  selectedCard.value = card
  const host = user.value.uid === room.value.ownerId
  await updateGameRoomCard(card.uid, room.value.ownerId, host)
}

async function battle() {
  const host = user.value.uid === room.value.ownerId
  showBattleEndScreen.value = true
  const hostCard = await generateCardData(room.value.resourceType, room.value.hostCard)
  const guestCard = await generateCardData(room.value.resourceType, room.value.guestCard)
  enemyCard.value = guestCard
  const result = host ? guestCard.attack < hostCard.attack : guestCard.attack > hostCard.attack;
  battleResult.value = result;

  if (result) {
    currentBattleStats.value.userWon++
  } else {
    currentBattleStats.value.enemyWon++
  }

  const currentLocalStats = await userDataStore.captureBattleResult(battleResult.value)
  await updateUserData(user.value.uid, currentLocalStats)
  await clearGameRoomCards(room.value.ownerId)
}

async function leaveBattleRoom() {
  const host = user.value.uid === route?.params?.gameRoomId
  if (host) {
    await removeRoom(route?.params?.gameRoomId)
  }
  navigateTo('/game/lobby')
}

console.log(route?.params?.gameRoomId)


function cardDisabled(card) {
  return usedCards.includes(card.uid)
}

async function captureFBEvents(FBSnapshot) {
  room.value = await getRoomData(route?.params?.gameRoomId)

  if (!room.value.guestId || !room.value.ownerId) {
    showEnemyDeck.value = false;
    return
  }

  showEnemyDeck.value = true;

  if (room.value.guestId !== room.value.ownerId && !room.value.guestCard) {
    canChooseCard.value = true
    return
  }

  if (room.value.guestId === room.value.ownerId && !room.value.hostCard) {
    canChooseCard.value = true
    return
  }

  if (room.value.hostCard && room.value.guestCard) {
    battle()
  }

}

let roomObserver;

onMounted(() => {
  showEnemyDeck.value = false;
  roomObserver = observeRoomStatus(route?.params?.gameRoomId, captureFBEvents)
})


</script>

<template>
  <div class="battle-deck">
    <v-dialog v-model="showBattleEndScreen" width="auto">
      <v-card max-width="350" width="350" class="battle-result">

        <h1 class="battle-result-text">{{ battleResult ? 'YOU WON!' : 'YOU LOST' }}</h1>

        <div class="battle-result-cards">
          <div class="battle-result-cards-column">
            <p class="battle-result-cards-column-text">Enemy</p>
            <CardContainer :card="enemyCard" :card-index="100" />
          </div>
          <div class="battle-result-cards-column battle-result-cards-column-vs">
            <span class="battle-result-cards-column-vs">VS</span>
          </div>
          <div class="battle-result-cards-column">
            <p class="battle-result-cards-column-text">You</p>
            <CardContainer :card="selectedCard" :card-index="101" />
          </div>
        </div>

        <div class="battle-result-score">
          <div class="battle-result-score-block">
            <p class="battle-result-score-text">LOST</p>
            <p class="battle-result-score-result">{{ currentBattleStats.enemyWon }}</p>
          </div>
          <div class="battle-result-score-block">
            <p class="battle-result-score-text">WON</p>
            <p class="battle-result-score-result">{{ currentBattleStats.userWon }}</p>
          </div>
        </div>

        <div class="battle-results-options">
          <v-btn class="ms-auto" text="Play again" @click="showBattleEndScreen = false"
            v-if="usedCards.length !== 5"></v-btn>
          <v-btn class="ms-auto" text="Leave" @click="leaveBattleRoom()" v-if="usedCards.length === 5"></v-btn>
        </div>

      </v-card>
    </v-dialog>

    <div class="enemy-deck" v-if="showEnemyDeck">
      <EnemyCardsContainer v-for="(card, index) in userDeckForSelectedResource" :key="index" :card-index="index" />
    </div>

    <div class="battle-spacer" :class="{
      'battle-spacer--no-enemy': showEnemyDeck === false
    }">
      <h1 class="phase-type" v-show="!showBattleEndScreen">{{ showEnemyDeck && canChooseCard ? 'ATTACK PHASE' :
      'AWAITING ENEMY' }}</h1>
    </div>

    <div class="my-deck" :class="{
      'my-deck--no-enemy': canChooseCard === false
    }">
      <CardContainer v-for="(card, index) in userDeckForSelectedResource" :key="index" @click="selectCard(card)"
        :card="card" :class="{ 'is-disabled': cardDisabled(card) }" :card-index="index" />
    </div>
  </div>
</template>

<style lang="scss">
.battle-deck {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 55rem;
  height: 50vh;
  align-items: center;
  border-radius: 1rem;
  margin: 3rem;
  background-color: #282645;
  box-shadow: inset 0rem 0rem 21rem -2rem black;

  @media screen and (max-width: 580px) {
    border-radius: 0;

    margin: 0;
    height: 80vh;
  }

  .enemy-deck {
    @media screen and (max-width: 580px) {

      margin-top: -6rem;
    }
  }
}

.battle-spacer {
  width: 100%;
  margin: 10rem auto;
  position: relative;
  opacity: .3;

  &.battle-spacer--no-enemy {
    margin-top: calc(10rem + 18.5rem);
  }
}

.phase-type {
  color: #fff;
  opacity: 0.6;
  font-size: 4.1rem;
  position: absolute;
  width: 100%;
  text-align: center;
  top: 0;
}

.my-deck,
.enemy-deck {
  display: flex;
}

.my-deck {
  &.my-deck--no-enemy {
    pointer-events: none;
  }
}

.card.is-disabled {
  opacity: .3;
  pointer-events: none;
}

.v-card.battle-result {
  padding: 2rem;
  border-radius: 1rem;

  .battle-result-text {
    text-align: center;
    border-bottom: 0.2rem solid #fff;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
  }
}

.battle-result-cards {
  pointer-events: none;
  display: flex;
  justify-content: space-around;

  .battle-result-cards-column.battle-result-cards-column-vs {
    display: flex;
    justify-content: center;
    align-items: center;

    .battle-result-cards-column-vs {
      font-size: 3rem;
      letter-spacing: -0.5rem;
    }
  }

  .battle-result-cards-column {
    .battle-result-cards-column-text {
      font-size: 1.4rem;
      text-transform: uppercase;
      text-align: center;
      width: 100%;
      text-shadow: 0rem 0rem 0.4rem #FC0858;
      font-weight: bold;
      letter-spacing: 0.2rem;
    }

    .card {
      margin: 1rem;
    }
  }

}

.battle-results-options {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: auto;
  flex-wrap: wrap;

  .ms-auto {
    width: 12rem;
    margin: 1rem !important;
  }
}


.battle-result-score {
  display: flex;
  justify-content: center;
  align-items: center;
}

.battle-result-score-block {
  font-size: 1.5rem;
  font-weight: bold;
  background-color: #282645;
  border: .2rem solid #FC0858;
  padding: 0.5rem 2rem;
  border-radius: 1rem;
  margin: 1rem;
}

.battle-result-score-text {
  font-size: 1rem;
}

.battle-result-score-result {
  text-align: center;
}
</style>
