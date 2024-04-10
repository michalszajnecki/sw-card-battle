<script setup lang="ts">
import { useBattleData } from '../stores/battleData';
import { useUserData } from '../stores/userData';
import { generateCardData, getCardForComputerPlayer, buildDeckForPlayer } from '../../services/generateCardData';
import { onDeactivated, onMounted, ref, computed, nextTick } from 'vue';
useHead({
  title: 'Login'
})
definePageMeta({
  layout: 'game',
  middleware: [
    'auth'
  ]
});
const battleDataStore = useBattleData()
const userDataStore = useUserData()

const battleResource = ref(battleDataStore.resource)
const enemyStatus = ref(battleDataStore.enemyStatus)
const showEnemyDeck = ref(false)
const userDeckForSelectedResource = computed(() => {
  return buildDeckForPlayer(battleDataStore.resource)
})

const currentBattleStats = ref({ enemyWon: 0, userWon: 0 })

const timeSpentInRoom = ref(0)
const enemyCard = ref()
const selectedCard = ref()
let timeInterval;
function updateTimer() {
  timeSpentInRoom.value++
  // clearInterval(timeInterval)
}
const showBattleEndScreen = ref(false)
const battleResult = ref(true)

const { user, registerUser, loginUser } = useFirebaseAuth()
const { addNewUserData, getUserData, updateUserData } = useFirestoreDatabase()

async function battle(card) {

  selectedCard.value = card
  showBattleEndScreen.value = true

  const result = enemyCard.value.attack < card.attack;
  battleResult.value = result;

  if (result) {
    currentBattleStats.value.userWon++
  } else {
    currentBattleStats.value.enemyWon++
  }


  const currentLocalStats = await userDataStore.captureBattleResult(battleResult.value)

  console.log({ currentLocalStats });

  await updateUserData(user.value.uid, currentLocalStats)
}

function leaveBattleRoom() {
  clearInterval(timeInterval)
  navigateTo('/game/lobby')
}

async function playAgain() {
  if (battleDataStore.enemyId !== 'computer') {
    leaveBattleRoom()
  } else {
    showEnemyDeck.value = false;
    showBattleEndScreen.value = false
    enemyCard.value = getCardForComputerPlayer(battleDataStore.resource)
    await nextTick()
    showEnemyDeck.value = true;
  }
}



function awaitingEnemy() {
  updateTimer();
  if (enemyStatus.value) {

  }
}

onMounted(() => {
  // flow

  // 1. check if enemy is avaiable.If not, start waiting loop
  // 2.
  showEnemyDeck.value = true;
  enemyCard.value = getCardForComputerPlayer(battleDataStore.resource)

  timeInterval = setInterval(async function () {
    updateTimer()
  }, 1000)
})

onDeactivated(() => {
  clearInterval(timeInterval)
})
</script>

<template>
  <div class="battle-deck">

    {{ currentBattleStats.userWon }}
    {{ currentBattleStats.enemyWon }}


    <v-dialog v-model="showBattleEndScreen" width="auto">
      <v-card max-width="400" prepend-icon="mdi-sword-cross" title="Battle!">


        <div class="versus-line">
          <div>Enemy
            <CardContainer :card="enemyCard" :card-index="100" />
          </div>
          <div>You

            <CardContainer :card="selectedCard" :card-index="101" />
          </div>
        </div>
        <h1>{{ battleResult ? 'WON' : 'LOST' }}</h1>
        <template v-slot:actions>


          <v-btn class="ms-auto" text="Leave" @click="leaveBattleRoom()"></v-btn>
          <v-btn class="ms-auto" text="Play again" @click="playAgain()"></v-btn>
        </template>
      </v-card>
    </v-dialog>






    <div class="enemy-deck" v-if="showEnemyDeck">
      <EnemyCardsContainer v-for="(card, index) in userDeckForSelectedResource" :key="index" :card-index="index" />
    </div>

    <div class="battle-spacer">
      <hr>
    </div>
    <div class="my-deck">
      <CardContainer v-for="(card, index) in userDeckForSelectedResource" :key="index" @click="battle(card)"
        :card="card" :card-index="index" />
    </div>





  </div>
</template>

<style lang="scss">
.battle-deck {
  display: flex;
  flex-direction: column;
}

.battle-spacer {
  width: 100%;
  margin: 20rem auto;
}

.my-deck,
.enemy-deck {
  display: flex;
}
</style>
