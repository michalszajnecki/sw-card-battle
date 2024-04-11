<script setup lang="ts">
const showEnemyDeck = defineModel('noEnemy')
const canChooseCard = defineModel('userControl')
</script>

<template>
  <div class="battle-spacer" :class="{
    'battle-spacer--no-enemy': showEnemyDeck === false
  }">
    <h1 class="phase-type">{{ showEnemyDeck && canChooseCard ? 'ATTACK PHASE' :
    'AWAITING ENEMY' }}</h1>
  </div>
</template>

<style lang="scss">
.battle-spacer {
  width: 100%;
  margin: 10rem auto;
  position: relative;
  opacity: .3;

  &.battle-spacer--no-enemy {
    margin-top: calc(10rem + 18.5rem);
  }

  .phase-type {
    color: #fff;
    opacity: 0.6;
    font-size: 4.1rem;
    position: absolute;
    width: 100%;
    text-align: center;
    top: 0;
  }
}
</style>
