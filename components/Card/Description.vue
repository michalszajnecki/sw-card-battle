<script setup lang="ts">
const description = defineModel('description')
</script>

<template>
  <div class="description">
    <p class="description-text">{{ description }}</p>
  </div>
</template>

<style lang="scss" scoped>
.description-text {
  font-size: 0.72rem;
  margin: 0 auto 1rem;
}
</style>
