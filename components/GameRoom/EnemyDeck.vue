<script setup lang="ts">
</script>

<template>
  <div class="enemy-deck">
    <EnemyCardsContainer v-for="index in 5" :key="index" :card-index="index" />
  </div>
</template>

<style lang="scss" scoped>
.enemy-deck {
  display: flex;
  max-width: 100%;

  @media screen and (max-width: 580px) {
    margin-top: -6rem;
  }
}
</style>
