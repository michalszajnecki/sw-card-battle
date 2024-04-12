<script setup lang="ts">
if (process.client) {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
}
</script>

<template>
  <div class="default-layout">
    <v-layout class="rounded rounded-md">
      <v-main class="d-flex align-center justify-center">
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
  overflow-y: auto !important;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  font-size: 10px !important; // reset for vetify font-size
  font-family: 'Noto Sans', sans-serif;
  font-weight: 300;
  font-style: normal;
}

h1 {
  font-family: "Poller One", serif;
  font-weight: 400;
  font-style: normal;
}

.default-layout {
  background-position: center;
  background-size: cover;
  background-image: url('/login-screen.webp');
}
</style>
