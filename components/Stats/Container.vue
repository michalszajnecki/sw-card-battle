<script setup lang="ts">
import { ref } from 'vue'
import { useUserData } from '../stores/userData';
import { calculateWinLossRatio, generateStyleObj } from '../../services/chartService'

const userDataStore = useUserData()
const statsDialog = ref(false)
const statsPieStyle = ref({})
const calculatedRatio = ref(0)

async function openStats() {
  const ratio = await userDataStore.getWonLostData()
  calculatedRatio.value = calculateWinLossRatio(ratio)
  statsPieStyle.value = generateStyleObj(calculatedRatio.value)
  statsDialog.value = !statsDialog.value
}
</script>

<template>
  <v-btn @click="openStats()">
    Open user Stats
  </v-btn>
  <v-dialog v-model="statsDialog" width="auto">
    <v-card max-width="400">
      <template v-slot:default>
        <h1 class="win-ratio">win-lose ratio</h1>
        <div class="chart">
          <h1 class="calculated-ratio">{{ calculatedRatio }}%</h1>
          <div class="pie" :style="statsPieStyle"></div>
        </div>
        <div class="results">
          <p class="results-text">{{ userDataStore.stats.won }} won vs. {{ userDataStore.stats.lost
            }} lost</p>
        </div>
      </template>
      <template v-slot:actions>
        <v-btn class="ms-auto" text="Close" @click="statsDialog = false"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
.win-ratio {
  padding: 2rem 1rem 0 1rem;
  width: 100%;
  text-align: center;
}

.chart {
  width: 28rem;
  height: 31rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .calculated-ratio {
    position: absolute;
    font-size: 5rem;
    text-shadow: 0rem 0rem 4rem #000000;
  }

  .pie {
    height: 20rem;
    width: 20rem;
    border-radius: 50%;
    box-shadow: 0rem 0rem 8rem -2rem #ff0095, inset 0rem 0rem 8rem -2rem #283300;
  }
}

.results-text {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  width: 100%;
  display: block;
}
</style>
