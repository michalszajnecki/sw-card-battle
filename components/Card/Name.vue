<script setup lang="ts">
const name = defineModel('name')
</script>

<template>
  <div class="name">
    <p class="name-text">{{ name }}</p>
  </div>
</template>

<style lang="scss" scoped>
.name-text {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: -.2rem;
  margin: 0 auto .25rem;
}
</style>
