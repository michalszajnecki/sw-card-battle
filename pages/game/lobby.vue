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
import { ref } from 'vue'
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


const { createNewGameroom, getRooms } = useFirestoreDatabase()
const { user, registerUser, loginUser } = useFirebaseAuth()



async function createRoom() {
  console.log(user.value.uid);
  createNewGameroom(user.value.uid, 'people', 'Play with me pliz')
  rooms.value = await getRooms()
  console.log(rooms.value);
}
// createNewGameroom

// uid: string, resourceType: string

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
        <div class="av-icon" :class="{
      'av-people': item.resourceType === 'people',
      'av-starships': item.resourceType === 'starships',
      'av-planets': item.resourceType === 'planets',
    }"></div>

        <span class="room-name">
          {{ item.roomName }}
        </span>
        <span class="room-created">
          Created: {{ formatDate(item.created) }}
        </span>
      </div>
    </div>





    <v-data-iterator :items="rooms">
      <template v-slot:default="{ rooms }">
        <template v-for="(item, i) in rooms" :key="i">
          <v-card>
            <v-avatar color="surface-variant"></v-avatar>
            <v-chip>
              Startship
            </v-chip>
            <button>join</button>

          </v-card>

          <br>
        </template>
      </template>
    </v-data-iterator>



  </div>
</template>

<style lang="scss">
.lobby {
  width: 100%;
  max-width: 80rem;
  background: black;
  padding: 3rem;
  margin: 2rem;
  border-radius: 1rem;
}

.lobby-list-header {
  margin: 3rem auto;

  .lobby-list-header-text {
    font-size: 3rem;
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
  box-shadow: 0 1rem 5rem -2rem #FC0858;
  display: flex;
  align-items: center;
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
</style>
