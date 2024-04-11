<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserData } from '../stores/userData'
const { user, logoutUser } = useFirebaseAuth()
const { getUserData } = useFirestoreDatabase()
const userDataStore = useUserData()

if (process.client) {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
}

async function logout() {
  await logoutUser()
  navigateTo('/login')
}

onMounted(async () => {
  const userFBData = await getUserData(user.value.uid)
  await userDataStore.updateData(userFBData)
})
</script>

<template>
  <div class="game-layout">
    <v-layout class="rounded rounded-md">
      <v-app-bar :elevation="8">
        <v-app-bar-title class="app-title">STAR WARS BATTLE CARDS</v-app-bar-title>

        <template v-slot:append>
          <StatsContainer />
          <v-btn @click="logout()">LOGOUT</v-btn>
        </template>
      </v-app-bar>

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
.game-layout {
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

.game-layout {
  background: linear-gradient(180deg, #292847, #0E0D1F);
}

.v-toolbar-title.app-title {
  font-family: "Poller One", serif;
  color: #FFF;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: -.1rem;
  user-select: none;
}
</style>
