<script setup lang="ts">
import { useBattleData } from '../stores/battleData';
import { useUserData } from '../stores/userData';
import { generateCardData, getCardForComputerPlayer } from '../../services/generateCardData';
import { onMounted } from 'vue';
useHead({
  title: 'Login'
})

const battleDataStore = useBattleData()
const userDataStore = useUserData()

const battleResource = ref(battleDataStore.resource)
const enemyStatus = ref(battleDataStore.enemyStatus)

const userDeckForSelectedResource = computed(() => {

  console.log(userDataStore.deck);
  console.log(battleResource);

  return userDataStore.deck[battleResource.value]
})


const timeSpentInRoom = ref(0)
const enemyCard = ref()
let timeInterval;
function updateTimer() {
  timeSpentInRoom.value++
  // clearInterval(timeInterval)
}
const showBattleEndScreen = ref(false)
const battleResult = ref(true)
function battle(card) {
  showBattleEndScreen.value = true
  battleResult.value = Number(enemyCard.value.attack) < Number(card)


  userDataStore.captureBattleResult(battleResult.value)
}

function leaveBattleRoom() {
  clearInterval(timeInterval)
  navigateTo('/lobby')
}

onMounted(() => {

  enemyCard.value = getCardForComputerPlayer('people')

  timeInterval = setInterval(async function () {
    updateTimer()
  }, 1000)
})
</script>

<template>
  <div>



    <v-dialog v-model="showBattleEndScreen" width="auto">
      <v-card max-width="400" prepend-icon="mdi-update"
        text="Your application will relaunch automatically after the update is complete." title="Update in progress">
        <h1>{{ battleResult }}</h1>
        <template v-slot:actions>


          <v-btn class="ms-auto" text="Leave" @click="leaveBattleRoom()"></v-btn>
          <v-btn class="ms-auto" text="Play again" @click="startSinglePlayerGame('starship')"></v-btn>
        </template>
      </v-card>
    </v-dialog>



    {{ enemyCard }}
    {{ timeSpentInRoom }}
    welcome to game screen

    <br>
    {{ battleResource }}
    <br>
    {{ enemyStatus }}
    <br>
    {{ userDeckForSelectedResource }}


    <div class="my-deck">
      <CardContainer v-for="(cardId, index) in userDeckForSelectedResource" :key="index"
        @click="battle(generateCardData('people', cardId).attack)" :card-index="index" :card-id="cardId"
        :card-type="'people'" />
    </div>





  </div>
</template>

<style lang="scss">
.my-deck {
  display: flex;
}
</style>
