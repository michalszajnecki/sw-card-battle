<script setup lang="ts">

import { defineModel } from 'vue';

const email = defineModel('email')
const password = defineModel('password')

function checkData(data) {
  console.log(data);
  return true
}
useHead({
  title: 'Login'
})
function submitdata() {
  console.log('working');

  navigateTo('/lobby')

}
</script>

<template>
  <div>
    <v-sheet class="mx-auto" width="300">
      <v-form @submit.prevent="submitdata">
        <v-text-field v-model="email" :rules="[checkData]" label="email"></v-text-field>
        <v-text-field v-model="password" :rules="[checkData]" label="password"></v-text-field>
        <v-btn class="mt-2" type="submit" block>Submit</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<style lang="scss"></style>
