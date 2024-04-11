<script setup lang="ts">
import { onMounted, ref } from 'vue';
const cardIndex = defineModel('cardIndex')
const playAnimation = ref(false)
onMounted(() => {
  playAnimation.value = true
})
</script>

<template>
  <div class="card" :class="[`card-${cardIndex}`]"></div>
</template>

<style lang="scss" scoped>
@keyframes moveDown {
  0% {
    top: 0;
  }

  50% {
    top: 4rem;
  }

  100% {
    top: 0;
  }
}

@keyframes selectedCard {
  0% {
    top: 0;
  }


  100% {
    top: 7rem;
  }
}

.card {
  background-image: url('/card-back.webp');
  width: 9rem;
  height: 14.5rem;
  border-radius: 1rem;
  background-size: 150%;
  background-position: center;
  box-shadow: 0 0 50px 15px #08436338;
  color: #fff;
  position: relative;

  margin: 2rem 0;
  transition: all ease 1s;
  animation: moveDown 2s;



  &.card-0 {
    animation-delay: 1s;
    transform: rotate(190deg);
    left: 4rem;
  }

  &.card-1 {
    animation-delay: 2s;
    transform: rotate(185deg);
    left: 2rem;

  }

  &.card-2 {
    animation-delay: 5s;
    transform: rotate(180deg);
    animation: selectedCard 2s forwards;
  }

  &.card-3 {
    animation-delay: 3s;
    transform: rotate(175deg);
    left: -2rem;
  }

  &.card-4 {
    animation-delay: 4s;
    transform: rotate(170deg);
    left: -4rem;
  }

}
</style>
