<script setup lang="ts">

definePageMeta({
  layout: 'game',
  middleware: [
    'auth'
  ]
});
useHead({
  title: 'My settings'
})

</script>

<template>
  <div>
    welcome to user stats
  </div>
</template>

<style lang="scss"></style>
