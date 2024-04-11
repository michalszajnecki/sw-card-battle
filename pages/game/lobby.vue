<script setup lang="ts">
useHead({
  title: 'Lobby'
})

definePageMeta({
  layout: 'game',
  middleware: [
    'auth'
  ]
});
</script>

<template>
  <div class="lobby">
    <SelectGameContainer />

    <div class="lobby-list-header">
      <h1 class="lobby-list-header-text">Avaiable game rooms</h1>
      <div class="line"></div>
    </div>

    <GameRoomsContainer />
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
  margin: 3rem auto 0;

  .lobby-list-header-text {
    font-size: 2rem;
    color: #fff;
  }

  .line {
    width: 100%;
    height: .25rem;
    background-color: #fff;
    margin: 0 auto;
  }
}
</style>
