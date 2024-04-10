<script setup lang="ts">
import { onMounted, ref } from 'vue';
const cardIndex = defineModel('cardIndex')
const playAnimation = ref(false)
onMounted(() => {
  playAnimation.value = true
})

</script>

<template>
  <div class="card" :class="[`card-${cardIndex}`]">

  </div>
</template>

<style lang="scss" scoped>
@keyframes moveDown {
  0% {
    top: 0;
  }

  50% {
    top: 14rem;
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
    top: 19rem;
  }
}

.card {
  background-image: url('/card-back.webp');
  width: 10rem;
  height: 12.5rem;
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
    animation-delay: 5s;
    transform: rotate(210deg);

  }

  &.card-1 {
    animation-delay: 7s;
    transform: rotate(195deg);

  }

  &.card-2 {
    animation-delay: 15s;
    transform: rotate(180deg);
    animation: selectedCard 2s forwards;
    scale: 1.25;

  }

  &.card-3 {
    animation-delay: 11s;
    transform: rotate(165deg);

  }

  &.card-4 {
    animation-delay: 13s;
    transform: rotate(150deg);

  }

}
</style>
