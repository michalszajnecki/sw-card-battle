<script setup lang="ts">
const card = defineModel('card')
const cardIndex = defineModel('cardIndex')
</script>

<template>
  <div class="card" v-if="card" :class="[`card-${cardIndex}`]"
    :style="{ 'background-image': 'url(' + '/anakin.webp' + ')' }">
    <div class="shadow"></div>
    <div class="card-container">
      <CardName :name="card.name" />
      <CardDescription :description="card.description" />
      <CardAttack :attack="card.attack" />
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
  transition: all ease 1s;

  &:hover {
    // scale: 2;
    top: -2rem;
    z-index: 99;
  }

  &.card-0 {
    transform: rotate(-30deg);
    top: 4rem;

    &:hover {
      top: -2rem;
    }
  }

  &.card-1 {
    transform: rotate(-15deg);
    top: 4rem;

    &:hover {
      top: -2rem;
    }
  }

  &.card-2 {
    transform: rotate(0deg);
    top: 4rem;

    &:hover {
      top: -2rem;
    }
  }

  &.card-3 {
    transform: rotate(15deg);
    top: 4rem;

    &:hover {
      top: -2rem;
    }
  }

  &.card-4 {
    transform: rotate(30deg);
    top: 4rem;

    &:hover {
      top: -2rem;
    }
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
