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
  background-color: #292847;
  border: .2rem solid #FC0858;
  padding: .5rem;
  text-align: center;
  border-radius: .75rem;
  display: flex;
  flex-wrap: wrap;

  i {
    margin: auto;
  }

  .attack-power {
    font-weight: bold;
    font-size: 1rem;
    margin: 0 .5rem;
    line-height: 1;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
