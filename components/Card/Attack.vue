<script setup lang="ts">
const attack = defineModel('attack')
</script>

<template>
  <div class="attack">
    <v-icon icon="mdi-sword-cross"></v-icon>
    <span class="attack-power">{{ attack }}</span>
  </div>
</template>

<style lang="scss" scoped>
.attack {
  font-size: 1rem;
  background-color: red;
  border: .2rem solid gold;
  padding: .5rem;
  text-align: center;
  border-radius: .75rem;

  .attack-power {
    font-weight: bold;
    font-size: 1rem;
    margin: 0 .5rem;
    line-height: 1;
  }
}
</style>
