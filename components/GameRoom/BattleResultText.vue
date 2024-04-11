<script setup lang="ts">
const battleResult = defineModel('result')
</script>

<template>
  <h1 class="battle-result-text">{{ battleResult ? 'YOU WON!' : 'YOU LOST' }}</h1>
</template>

<style lang="scss">
.battle-result-text {
  text-align: center;
  border-bottom: 0.2rem solid #fff;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
}
</style>
