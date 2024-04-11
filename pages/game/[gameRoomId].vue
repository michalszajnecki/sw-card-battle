<script setup lang="ts">
import { useBattleData } from '../stores/battleData';
import { useUserData } from '../stores/userData';
import { generateCardData, buildDeckForPlayer } from '../../services/generateCardData';
import { onMounted, ref, computed } from 'vue';

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
const { user } = useFirebaseAuth()
const { updateUserData, observeRoomStatus, getRoomData, updateGameRoomCard, clearGameRoomCards, removeRoom } = useFirestoreDatabase()

const room = ref()
const enemyCard = ref()
const selectedCard = ref()
const showBattleEndScreen = ref(false)
const battleResult = ref(true)
const usedCards: string[] = []
const showEnemyDeck = ref(false)
const canChooseCard = ref(false)
const currentBattleStats = ref({ enemyWon: 0, userWon: 0 })

const userDeckForSelectedResource = computed(() => {
  return buildDeckForPlayer(battleDataStore.resource)
})

let roomObserver;

async function selectCard(card) {
  usedCards.push(card.uid)
  selectedCard.value = card
  await updateGameRoomCard(card.uid, room.value.ownerId, isHost())
}

async function battle() {
  showBattleEndScreen.value = true
  const hostCard = await generateCardData(room.value.resourceType, room.value.hostCard)
  const guestCard = await generateCardData(room.value.resourceType, room.value.guestCard)
  enemyCard.value = guestCard
  const result = isHost() ? guestCard.attack < hostCard.attack : guestCard.attack > hostCard.attack;
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
  if (isHost()) {
    await removeRoom(route?.params?.gameRoomId)
  }
  navigateTo('/game/lobby')
}

function isHost() {
  return user.value.uid === route?.params?.gameRoomId
}

function cardDisabled(card) {
  return usedCards.includes(card.uid)
}

async function captureFBEvents() {
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

onMounted(() => {
  showEnemyDeck.value = false;
  roomObserver = observeRoomStatus(route?.params?.gameRoomId, captureFBEvents)
})
</script>

<template>
  <div class="battle-deck">
    <v-dialog v-model="showBattleEndScreen" width="auto">
      <v-card max-width="350" width="350" class="battle-result">

        <GameRoomBattleResultText :result="battleResult" />
        <GameRoomBattleResultCards :selected-card="selectedCard" :enemy-card="enemyCard" />
        <GameRoomBattleResultScore :battle-stats="currentBattleStats" />

        <div class="battle-results-options">
          <v-btn class="ms-auto" text="Play again" @click="showBattleEndScreen = false"
            v-if="usedCards.length !== 5"></v-btn>
          <v-btn class="ms-auto" text="Leave" @click="leaveBattleRoom()" v-if="usedCards.length === 5"></v-btn>
        </div>

      </v-card>
    </v-dialog>

    <GameRoomEnemyDeck v-if="showEnemyDeck" />
    <GameRoomComplexBattleSpacer :no-enemy="showEnemyDeck" :user-control="canChooseCard" />

    <div class="my-deck" :class="{
      'my-deck--no-enemy': canChooseCard === false
    }">
      <CardContainer v-for="(card, index) in userDeckForSelectedResource" :key="index" @click="selectCard(card)"
        :card="card" :class="{ 'is-disabled': cardDisabled(card) }" :card-index="index" />
    </div>
  </div>
</template>

<style lang="scss">
@use "~/assets/css/gameRoom.scss";

.my-deck {
  &.my-deck--no-enemy {
    pointer-events: none;
  }
}
</style>
