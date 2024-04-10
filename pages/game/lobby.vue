<script setup lang="ts">


useHead({
  title: 'Login'
})

definePageMeta({
  layout: 'game',
  middleware: [
    'auth'
  ]
});
import { onMounted, ref } from 'vue'
import { useBattleData } from '../stores/battleData';
import { useUserData } from '../stores/userData';

const rooms = ref()
const dialog = ref(false)
const singlePlayerDialog = ref(false)





// import useBattleData from '../stores/battleData'
// import useUserData from '../stores/userData'

const battleDataStore = useBattleData()
const userDataStore = useUserData()

async function startSinglePlayerGame(resourceType: string) {
  // get new game room

  dialog.value = false
  const newRoutePath = await battleDataStore.assignNewGameRoom({
    resource: resourceType,
    enemyId: 'computer',
  })


  navigateTo(newRoutePath)

}


const { createNewGameroom, getRooms, getUserData } = useFirestoreDatabase()
const { user, registerUser, loginUser } = useFirebaseAuth()



async function createRoom() {
  console.log(user.value.uid);
  createNewGameroom(user.value.uid, 'people', 'Play with me pliz')
  rooms.value = await getRooms()
  console.log(rooms.value);
}


const won = ref(0)
const lost = ref(0)
const calculatedRatio = ref(0)
async function paintWinLoseRatio(ratio) {
  calculatedRatio.value = ratio.won / ratio.lost
  if (ratio.won + ratio.lost === 0) {
    calculatedRatio.value = 0
    return
  }

  calculatedRatio.value = Math.floor(ratio.won / ratio.lost)
}
// createNewGameroom

// uid: string, resourceType: string

async function joinRoom(room) {
  const newRoutePath = await battleDataStore.assignNewGameRoom({
    enemyId: room.id,
    resource: room.resourceType,
    enemyId: 'player',
  })


  navigateTo(newRoutePath)
}

onMounted(async () => {
  rooms.value = await getRooms()
  const ratio = await userDataStore.getWonLostData()
  paintWinLoseRatio(ratio)

})

function formatDate(timestamp: number) {
  const date = new Date(timestamp);

  // Get hours and minutes in local time
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format hours and minutes to have leading zeroes if necessary
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  // Construct the time string in HH:MM format
  return `${formattedHours}:${formattedMinutes}`;
}
</script>

<template>
  <div class="lobby">

    <div class="chart">
      <h1>{{ calculatedRatio }}</h1>
      <div class="pie"></div>
    </div>

    <v-dialog v-model="singlePlayerDialog" width="auto">
      <v-card max-width="400" prepend-icon="mdi-update"
        text="Test your luck with battle agains computer. Select resource type, and join private battle room."
        title="Play against computer">
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Planet" @click="startSinglePlayerGame('planets')"></v-btn>
          <v-btn class="ms-auto" text="People" @click="startSinglePlayerGame('people')"></v-btn>
          <v-btn class="ms-auto" text="Starship" @click="startSinglePlayerGame('starships')"></v-btn>
        </template>
      </v-card>
    </v-dialog>


    <v-dialog v-model="dialog" width="auto">
      <v-card max-width="400" prepend-icon="mdi-update"
        text="Your application will relaunch automatically after the update is complete." title="Update in progress">
        <template v-slot:actions>
          <v-btn variant="elevated" class="ms-auto" text="Planet" @click="startSinglePlayerGame('planet')"></v-btn>
          <v-btn variant="elevated" class="ms-auto" text="People" @click="startSinglePlayerGame('people')"></v-btn>
          <v-btn variant="elevated" class="ms-auto" text="Starship" @click="startSinglePlayerGame('starship')"></v-btn>
        </template>
      </v-card>
    </v-dialog>




    <div class="lobby-game-type">
      <v-btn size="large" @click="singlePlayerDialog = true">
        <v-icon icon="mdi-sword-cross"></v-icon> Single Player
      </v-btn>
      <v-btn size="large" variant="tonal" @click="createRoom()">
        <v-icon icon="mdi-sword-cross"></v-icon> Join Multiplayer
      </v-btn>
    </div>

    <div class="lobby-list-header">
      <h1 class="lobby-list-header-text">Avaiable game rooms</h1>
      <div class="line"></div>
    </div>

    <div class="lobby-list">
      <div class="lobby-list-item" v-for="(item, i) in rooms" :key="i">
        <button class="lobby-list-item-btn" @click="joinRoom(item)">

          <div class="av-icon" :class="{
        'av-people': item.resourceType === 'people',
        'av-starships': item.resourceType === 'starships',
        'av-planets': item.resourceType === 'planets',
      }"></div><span>Join battle</span>
        </button>

        <span class="room-name">
          {{ item.roomName }}
        </span>
        <span class="room-created">
          Created: {{ formatDate(item.created) }}
        </span>
      </div>
    </div>








  </div>
</template>

<style lang="scss">
.lobby {
  width: 100%;
  max-width: 80rem;
  background: #00000059;
  padding: 3rem;
  margin: 2rem;
  border-radius: 1rem;
}

.lobby-list-header {
  margin: 3rem auto;

  .lobby-list-header-text {
    font-size: 2.5rem;
    color: #fff;
  }

  .line {
    width: 100%;
    height: .5rem;
    background-color: #fff;
    margin: 0 auto 2rem;
  }
}

.lobby-list-item {
  background: #292847;
  border-radius: 1rem;
  padding: 1rem;
  color: #fff;
  font-size: 1.25rem;
  font-weight: bold;
  box-shadow: 0 1rem 5rem -2rem #FC0858, inset 0 -1rem 6rem -4rem #FC0858;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.room-name {
  margin: 1rem;
}

.room-created {
  margin-left: auto;
}

.av-icon {
  width: 5rem;
  height: 5rem;
  border: .1rem solid #fff;
  background-size: cover;
  border-radius: 100%;

  &.av-people {
    background-image: url('/people.webp');
  }

  &.av-starships {
    background-image: url('/starships.webp');
  }

  &.av-planets {
    background-image: url('/planets.webp');
  }
}

button.lobby-list-item-btn {
  background: #FC0858;
  display: flex;
  align-items: center;
  border-radius: 2.9rem;
}

button.lobby-list-item-btn span {
  padding: 0 2rem 0 1rem;
  text-transform: uppercase;
}


.chart {
  width: 400px;
  height: 200px;
  border: 1px solid #000;
  position: relative;

  .bar {
    position: absolute;
    bottom: 0;
    width: 100px;
    background-color: green;
    /* Default color */
    transition: height 0.5s ease;
  }

  .losses {
    left: 150px;
    background-color: red;
  }

  .label {
    position: absolute;
    bottom: -20px;
    font-family: Arial, sans-serif;
    font-size: 14px;
  }

  .pie {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background: conic-gradient(deepskyblue 0% 25%,
        orangered 25% 100%);
  }
}
</style>
