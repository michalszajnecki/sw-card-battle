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
.game-layout {
  background: linear-gradient(180deg, #292847, #0E0D1F);
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
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
