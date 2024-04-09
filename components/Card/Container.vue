<script setup lang="ts">
import { onMounted } from 'vue';
import { generateCardData } from '../../services/generateCardData';

const cardType = defineModel('cardType')
const cardId = defineModel('cardId')
const cardIndex = defineModel('cardIndex')


onMounted(() => {

})


const cardData = computed(() => {
  return generateCardData(cardType.value, cardId.value)
})

</script>

<template>
  <div class="card" v-if="cardType" :class="[`card-${cardIndex}`]"
    :style="{ 'background-image': 'url(' + '/anakin.webp' + ')' }">
    <div class="shadow"></div>
    <div class="card-container">
      <CardName :name="cardData.name" />
      <CardDescription :description="cardData.description" />
      <CardAttack :attack="cardData.attack" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 10rem;
  height: 12.5rem;
  border-radius: 1rem;
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 50px 15px #48abe0;
  color: #fff;
  position: relative;

  margin: 2rem 0;
  scale: 1;
  transition: all ease 1s;

  &:hover {
    // scale: 2;
    top: -2rem;
  }

  &.card-0 {
    transform: rotate(-30deg);
    top: 2rem;

    &:hover {
      // scale: 2;
      top: -2rem;
    }
  }

  &.card-1 {
    transform: rotate(-15deg);
  }

  &.card-2 {
    transform: rotate(0deg);
  }

  &.card-3 {
    transform: rotate(15deg);
  }

  &.card-4 {
    transform: rotate(30deg);
  }

  .shadow {
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    position: absolute;
    z-index: 0;
  }

  .card-container {
    position: absolute;
    z-index: 1;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1rem;
  }
}
</style>
