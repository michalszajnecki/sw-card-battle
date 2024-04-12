<script setup lang="ts">
useHead({
  title: 'Login'
})

import { defineModel } from 'vue';
import { useUserData } from '../stores/userData'
import { validatePassword, validateEmail } from '../services/inputValidators'

const email = defineModel('email')
const password = defineModel('password')
const formProcessing = ref(false)
const showLoginPanel = ref(true)

const { user, registerUser, loginUser } = useFirebaseAuth()
const { addNewUserData, getUserData } = useFirestoreDatabase()
const userDataStore = useUserData()

function togglePanels() {
  showLoginPanel.value = !showLoginPanel.value
}

async function handleRegistration() {
  formProcessing.value = true
  try {
    await registerUser(email.value, password.value)
    const userFBData = await addNewUserData(user.value.uid)
    moveToLobbyFlow(userFBData)
    formProcessing.value = false
  } catch (error) {
    formProcessing.value = false
  }
}

async function handlelogin() {
  formProcessing.value = true
  try {
    await loginUser(email.value, password.value)
    const userFBData = await getUserData(user.value.uid)
    moveToLobbyFlow(userFBData)
    formProcessing.value = false
  } catch (error) {
    formProcessing.value = false
  }
}

async function moveToLobbyFlow(userFBData) {
  await userDataStore.updateData(userFBData)
  navigateTo('/game/lobby')
}
</script>

<template>

  <v-container class="login-container">
    <v-row>
      <v-col cols="12">
        <h1 class="welcome-header">Let's play!</h1>
      </v-col>
    </v-row>
    <v-row align="center" class="form-container" no-gutters>
      <v-spacer></v-spacer>

      <v-col class="form-column form-column-registration" cols="12" :class="{
        'column-active': showLoginPanel === false
      }">
        <v-sheet class="pa-2 ma-2 sheet-welcome">
          <p class="panel-desc">Register to unlock access to best Star Wars Card Battler of all times!</p>
          <v-form @submit.prevent="handleRegistration">
            <v-text-field v-model="email" :rules="[validateEmail]" label="Email"
              data-test="signup-email"></v-text-field>
            <v-text-field type="password" v-model="password" :rules="[validatePassword]" label="Password"
              data-test="signup-password"></v-text-field>
            <v-btn class="mt-2" type="submit" data-test="signup-submit" block>Submit</v-btn>
          </v-form>
          <p class="panel-desc panel-footer-desc">Already have an account?</p>
          <v-btn variant="outlined" type="submit" @click="togglePanels()" data-test="set-form-signup" block>Go
            to login</v-btn>
        </v-sheet>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="form-column form-column-login" cols="12" :class="{
        'column-active': showLoginPanel === true
      }">
        <v-sheet class="pa-2 ma-2 sheet-welcome">
          <p class="panel-desc">Login to conquer galaxy!</p>
          <v-form @submit.prevent="handlelogin">
            <v-text-field v-model="email" :rules="[validateEmail]" label="Email" data-test="login-email"></v-text-field>
            <v-text-field type="password" v-model="password" :rules="[validatePassword]" label="Password"
              data-test="login-password"></v-text-field>
            <v-btn class="mt-2" type="submit" data-test="login-submit" block>Submit</v-btn>
          </v-form>
          <p class="panel-desc panel-footer-desc">Need a new account?</p>
          <v-btn variant="outlined" type="submit" @click="togglePanels()" data-test="set-form-login" block>Go
            to signup</v-btn>
        </v-sheet>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.v-messages__message {
  font-weight: bold;
  color: #ff6a00;
}

.v-input {
  margin-bottom: 1.5rem;
}

.panel-desc {
  color: #FC0858;
  font-weight: bold;
  font-size: 1.8rem;
  padding: 2rem 0.5rem;
  text-align: center;

  &.panel-footer-desc {
    padding: 4rem 0.5rem 2rem;
  }
}

.sheet-welcome {
  border-radius: 1rem;
  padding: 1rem 2rem 3rem !important;
}

.welcome-header {
  color: #FC0858;
  text-align: center;
  margin: 12rem auto 4rem;
  font-size: 3rem;

  @media screen and (max-width: 580px) {
    margin-top: 6rem;
  }
}

.form-container {
  position: relative;
}

.form-column {
  position: absolute;
  transition: all ease 1s;

  &.column-active {
    top: 0;
    z-index: 2;
  }
}

.form-column-login {
  top: -200rem;
  z-index: 1;
}

.form-column-registration {
  top: 200rem;
  z-index: 1;
}

.login-container {
  width: 55rem;
  min-width: 30rem;
  height: 100vh;
  background-color: #282645;
  top: 0;
  left: 0;
  overflow: hidden;
  margin-left: 0;
}
</style>
