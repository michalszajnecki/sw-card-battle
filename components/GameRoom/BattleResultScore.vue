<script setup lang="ts">
const currentBattleStats = defineModel('battleStats')
</script>

<template>
  <div class="battle-result-score">
    <div class="battle-result-score-block">
      <p class="battle-result-score-text">LOST</p>
      <p class="battle-result-score-result">{{ currentBattleStats.enemyWon }}</p>
    </div>
    <div class="battle-result-score-block">
      <p class="battle-result-score-text">WON</p>
      <p class="battle-result-score-result">{{ currentBattleStats.userWon }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.battle-result-score {
  display: flex;
  justify-content: center;
  align-items: center;

  .battle-result-score-block {
    font-size: 1.5rem;
    font-weight: bold;
    background-color: #282645;
    border: .2rem solid #FC0858;
    padding: 0.5rem 2rem;
    border-radius: 1rem;
    margin: 1rem;
  }

  .battle-result-score-text {
    font-size: 1rem;
  }

  .battle-result-score-result {
    text-align: center;
  }
}
</style>
