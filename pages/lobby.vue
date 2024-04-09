<script setup lang="ts">


useHead({
  title: 'Login'
})

const markus = ref(1)

import { ref } from 'vue'
import { useBattleData } from '../stores/battleData';
import { useUserData } from '../stores/userData';

const page = ref(1)
const dialog = ref(false)
const singlePlayerDialog = ref(false)


const items = Array.from({ length: 15 }, (k, v) => ({
  title: 'Item ' + v + 1,
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
}))


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
</script>

<template>
  <div>

    <v-dialog v-model="singlePlayerDialog" width="auto">
      <v-card max-width="400" prepend-icon="mdi-update"
        text="Your application will relaunch automatically after the update is complete." title="Update in progress">
        <template v-slot:actions>


          <v-btn class="ms-auto" text="Planet" @click="startSinglePlayerGame('planet')"></v-btn>
          <v-btn class="ms-auto" text="People" @click="startSinglePlayerGame('people')"></v-btn>
          <v-btn class="ms-auto" text="Starship" @click="startSinglePlayerGame('starship')"></v-btn>
        </template>
      </v-card>
    </v-dialog>


    <v-dialog v-model="dialog" width="auto">
      <v-card max-width="400" prepend-icon="mdi-update"
        text="Your application will relaunch automatically after the update is complete." title="Update in progress">
        <template v-slot:actions>


          <v-btn class="ms-auto" text="Planet" @click="startSinglePlayerGame('planet')"></v-btn>
          <v-btn class="ms-auto" text="People" @click="startSinglePlayerGame('people')"></v-btn>
          <v-btn class="ms-auto" text="Starship" @click="startSinglePlayerGame('starship')"></v-btn>
        </template>
      </v-card>
    </v-dialog>


    <v-sheet :elevation="2" :height="200" :width="200" border rounded>
      <v-btn variant="tonal" @click="singlePlayerDialog = true">
        Single Player
      </v-btn>

      <v-btn variant="tonal" @click="dialog = true">
        Join Multiplayer
      </v-btn>

    </v-sheet>


    <div>
      <button>single player</button>
      <button>create multiplayer game</button> // add modal with battel-typeselect
    </div>


    <v-data-iterator :items="items" :page="page">
      <template v-slot:default="{ items }">
        <template v-for="(item, i) in items" :key="i">
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

<style lang="scss"></style>
