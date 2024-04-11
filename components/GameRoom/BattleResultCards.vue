<script setup lang="ts">
const enemyCard = defineModel('enemyCard')
const selectedCard = defineModel('selectedCard')
</script>

<template>
  <div class="battle-result-cards">
    <div class="battle-result-cards-column">
      <p class="battle-result-cards-column-text">Enemy</p>
      <CardContainer :card="enemyCard" :card-index="100" />
    </div>
    <div class="battle-result-cards-column battle-result-cards-column-vs">
      <span class="battle-result-cards-column-vs">VS</span>
    </div>
    <div class="battle-result-cards-column">
      <p class="battle-result-cards-column-text">You</p>
      <CardContainer :card="selectedCard" :card-index="101" />
    </div>
  </div>
</template>

<style lang="scss">
.battle-result-cards {
  pointer-events: none;
  display: flex;
  justify-content: space-around;

  .battle-result-cards-column.battle-result-cards-column-vs {
    display: flex;
    justify-content: center;
    align-items: center;

    .battle-result-cards-column-vs {
      font-size: 3rem;
      letter-spacing: -0.5rem;
    }
  }

  .battle-result-cards-column {
    .battle-result-cards-column-text {
      font-size: 1.4rem;
      text-transform: uppercase;
      text-align: center;
      width: 100%;
      text-shadow: 0rem 0rem 0.4rem #FC0858;
      font-weight: bold;
      letter-spacing: 0.2rem;
    }

    .card {
      margin: 1rem;
    }
  }
}
</style>
