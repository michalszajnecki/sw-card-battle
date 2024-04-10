<script setup lang="ts">
import { watch, onMounted } from 'vue'





if (process.client) {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  // We listen to the resize event
  window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
}

import { useUserData } from '../stores/userData';

const userDataStore = useUserData()

onMounted(() => {

})

</script>

<template>
  <div class="default-layout">
    <v-layout class="rounded rounded-md">
      <!-- <v-app-bar :elevation="8">
         <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

<v-app-bar-title>STAR WARS BATTLE</v-app-bar-title>

<template v-slot:append>
          <v-btn icon="mdi-heart">
            {{ userDataStore.stats.won }}
          </v-btn>

          <v-btn icon="mdi-magnify"></v-btn>

          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
</v-app-bar> -->


      <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
        <NuxtPage />

      </v-main>
    </v-layout>



  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lunasima:wght@400;700&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Merriweather+Sans:ital,wght@0,300..800;1,300..800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poller+One&display=swap');

* {
  -webkit-tap-highlight-color: transparent;
}

html,
body,
#__nuxt,
.default-layout {
  margin: 0;
  width: 100%;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  font-size: 10px; // reset for rems
  font-family: 'Noto Sans', sans-serif;
  font-weight: 300;
  font-style: normal;
  overflow: hidden;
}

h1 {
  font-family: "Poller One", serif;
  font-weight: 400;
  font-style: normal;
}

.default-layout {
  background-image: url('/login-screen.webp');
  background-size: cover;
}
</style>
