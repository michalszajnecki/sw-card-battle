<script setup lang="ts">
import { useBattleData } from '../stores/battleData';
import { useUserData } from '../stores/userData';
import { getCardForComputerPlayer, buildDeckForPlayer } from '../../services/generateCardData';
import { onMounted, ref, computed, nextTick } from 'vue';

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
const showEnemyDeck = ref(false)
const enemyCard = ref()
const selectedCard = ref()
const showBattleEndScreen = ref(false)
const battleResult = ref(true)
const usedCards: string[] = []

const { user } = useFirebaseAuth()
const { updateUserData } = useFirestoreDatabase()

const userDeckForSelectedResource = computed(() => {
  return buildDeckForPlayer(battleDataStore.resource)
})

onMounted(() => {
  showEnemyDeck.value = true;
  enemyCard.value = getCardForComputerPlayer(battleDataStore.resource)
})

async function battle(card) {
  usedCards.push(card.uid)
  selectedCard.value = card
  showBattleEndScreen.value = true
  battleResult.value = enemyCard.value.attack < card.attack;
  const currentLocalStats = await userDataStore.captureBattleResult(battleResult.value)
  await updateUserData(user.value.uid, currentLocalStats)
}

async function playAgain() {
  showEnemyDeck.value = false;
  showBattleEndScreen.value = false
  enemyCard.value = getCardForComputerPlayer(battleDataStore.resource)
  await nextTick()
  showEnemyDeck.value = true;
}

function leaveBattleRoom() {
  navigateTo('/game/lobby')
}

function cardDisabled(card) {
  return usedCards.includes(card.uid)
}
</script>

<template>
  <div class="battle-deck">
    <v-dialog v-model="showBattleEndScreen" width="auto">
      <v-card width="320" class="battle-result">

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

        <div class="battle-results-options">
          <v-btn class="ms-auto" text="Leave" @click="leaveBattleRoom()" data-test="leave-room"></v-btn>
          <v-btn class="ms-auto" text="Play again" @click="playAgain()" :disabled="usedCards.length >= 5"
            data-test="play-again"></v-btn>
        </div>

      </v-card>
    </v-dialog>

    <div class="enemy-deck" v-if="showEnemyDeck">
      <EnemyCardsContainer v-for="(card, index) in userDeckForSelectedResource" :key="index" :card-index="index" />
    </div>

    <div class="battle-spacer">
      <h1 class="phase-type" v-show="!showBattleEndScreen">ATTACK PHASE</h1>
    </div>

    <div class="my-deck">
      <CardContainer v-for="(card, index) in userDeckForSelectedResource" :key="index" @click="battle(card)"
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
  height: 63rem;
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
  max-width: 100%;
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
</style>
