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

        <GameRoomBattleResultText :result="battleResult" />
        <GameRoomBattleResultCards :selected-card="selectedCard" :enemy-card="enemyCard" />

        <div class="battle-results-options">
          <v-btn class="ms-auto" text="Leave" @click="leaveBattleRoom()" data-test="leave-room"></v-btn>
          <v-btn class="ms-auto" text="Play again" @click="playAgain()" :disabled="usedCards.length >= 5"
            data-test="play-again"></v-btn>
        </div>

      </v-card>
    </v-dialog>

    <GameRoomEnemyDeck v-if="showEnemyDeck" />
    <GameRoomSimpleBattleSpacer />

    <div class="my-deck">
      <CardContainer v-for="(card, index) in userDeckForSelectedResource" :key="index" @click="battle(card)"
        :card="card" :class="{ 'is-disabled': cardDisabled(card) }" :card-index="index" />
    </div>
  </div>
</template>

<style lang="scss">
@use "~/assets/css/gameRoom.scss";
</style>
