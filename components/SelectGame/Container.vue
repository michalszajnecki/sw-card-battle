<script setup lang="ts">
import { ref } from 'vue'
import { useBattleData } from '../stores/battleData';

const multiplayerDialog = ref(false)
const singlePlayerDialog = ref(false)
const battleDataStore = useBattleData()
const { createNewGameroom } = useFirestoreDatabase()
const { user } = useFirebaseAuth()

async function startSinglePlayerGame(resourceType: string) {
  singlePlayerDialog.value = false
  const newRoutePath = await battleDataStore.assignNewGameRoom({
    resource: resourceType,
    enemyId: 'computer',
  })
  navigateTo(newRoutePath)
}

async function createRoom(resourceType: string) {
  multiplayerDialog.value = false
  createNewGameroom(user().value.uid, resourceType)
  const newRoutePath = await battleDataStore.assignNewGameRoom({
    resource: resourceType,
    enemyId: user().value.uid,
  })
  navigateTo(newRoutePath)
}
</script>

<template>
  <v-dialog v-model="singlePlayerDialog" width="auto">
    <v-card max-width="400" prepend-icon="mdi-sword-cross"
      text="Test your luck with battle agains computer. Select resource type, and join private battle room. You will recive 5 random cards, giving you ability to play through 5 rounds. You can leave game after each round, but only best players stay till the end risking lovering their win-lose ratio!"
      title="Play against computer">
      <template v-slot:default>
        <p class="battle-resource-header">Select resource type!</p>
        <v-card class="battle-resource">
          <v-btn class="ms-auto" text="Planet" @click="startSinglePlayerGame('planets')"></v-btn>
          <v-btn class="ms-auto" text="People" @click="startSinglePlayerGame('people')"></v-btn>
          <v-btn class="ms-auto" text="Starship" @click="startSinglePlayerGame('starships')"></v-btn>
        </v-card>
      </template>
    </v-card>
  </v-dialog>

  <v-dialog v-model="multiplayerDialog" width="auto">
    <v-card max-width="400" prepend-icon="mdi-sword-cross"
      text="Fight agains other players and track your score after each turn. You will recive 5 random cards, giving you ability to play through 5 rounds. Each round require to spend one card. Think carefully, because not all cards are created equal!"
      title="Host multiplayer game">
      <template v-slot:default>
        <p class="battle-resource-header">Select resource type!</p>
        <v-card class="battle-resource">
          <v-btn variant="elevated" class="ms-auto" text="Planet" @click="createRoom('planet')"></v-btn>
          <v-btn variant="elevated" class="ms-auto" text="People" @click="createRoom('people')"></v-btn>
          <v-btn variant="elevated" class="ms-auto" text="Starship" @click="createRoom('starship')"></v-btn>
        </v-card>
      </template>
    </v-card>
  </v-dialog>

  <div class="lobby-game-type">
    <v-btn class="lobby-game-type-btn" size="large" @click="singlePlayerDialog = true">
      <v-icon icon="mdi-sword-cross"></v-icon> Single Player
    </v-btn>
    <v-btn class="lobby-game-type-btn" size="large" variant="tonal" @click="multiplayerDialog = true">
      <v-icon icon="mdi-sword-cross"></v-icon> Host Multiplayer Game
    </v-btn>
  </div>

</template>

<style lang="scss">
.v-card.battle-resource {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30rem;
  margin: auto;

  .ms-auto {
    margin: 2rem 1rem;
    width: 8rem;
  }
}

.lobby-game-type {
  display: flex;
  justify-content: space-around;
  max-width: 46rem;
  margin: auto;
  flex-wrap: wrap;

  .lobby-game-type-btn {
    width: 21rem;
    margin: 1rem;
    box-shadow: 0.2rem 0.2rem #FC0858 !important;

    i {
      margin: 0 1rem 0 -0.9rem;
      font-size: 2rem;
    }
  }
}

.battle-resource-header {
  font-size: 1.2rem;
  font-weight: bold;
  width: 100%;
  text-align: center;
  margin: 3rem auto 0;
}
</style>
