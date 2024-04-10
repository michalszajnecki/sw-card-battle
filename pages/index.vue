<script setup lang="ts">


useHead({
})

</script>

<template>
  <div class="login-container">

    <h1 class="welcome-header ">STAR WARS<br>BATTLE CARDS</h1>
    <p class="welcome-intro">Welcome, brave warriors, to the galaxy-spanning arena of Star Wars Battle Cards! Prepare to
      engage in thrilling
      card-based combat, where every move could alter the fate of the galaxy. May the Force be with you as you
      strategize, battle, and emerge victorious in this epic clash of heroes and villains.</p>
    <div class="cta-container">

      <v-btn class="welcome-cta" prepend-icon="mdi-arrow-down-bold" to="/login" nuxt stacked>
        START GAME
      </v-btn>
    </div>

    <p class="legal-stuff">Star Wars Battle Cards is an independently developed game created solely for recruitment and
      skill showcase
      purposes by Michal Szajnecki. This game is not affiliated with or endorsed by any official Star Wars publisher or
      associated entities. Any references to characters, names, or elements from the Star Wars universe are purely for
      entertainment and demonstration purposes. All rights to Star Wars and its associated intellectual property are
      owned by their respective copyright holders.</p>


  </div>
</template>

<style lang="scss" scoped>
.login-container {
  width: 55rem;
  min-width: 30rem;
  height: 100vh;
  background-color: #282645;
  position: absolute;
  top: 0;
  left: 0;
  // animation: showLoginPanel 2s forwards;
}

.cta-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome-cta.v-btn--stacked.v-btn--size-default {
  box-shadow: 0 1rem 5rem 2rem #FC0858;
  margin: 10rem auto;
  min-width: 20rem;
  font-size: 1.4rem;
  height: auto;
  padding: 2rem;
}

.welcome-header {
  color: #FC0858;
  text-align: center;
  margin: 12rem auto 4rem;
  font-size: 3rem;
}

.welcome-intro {
  font-size: 1.4rem;
  color: #fff;
  max-width: 80%;
  margin: auto;
}

.legal-stuff {
  color: #fff;
  font-size: 1rem;
  margin: 1rem;
  position: absolute;
  bottom: 0;
}
</style>
