/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia';

export const useBattleData = defineStore('battleData', {
  state: () => ({
    resource: 'people',
    enemyId: 'computer', // get enemy id from firebase
    gameRoomId: 1, // generate new room id
    enemyStatus: 'ready' // pending
  }),
  actions: {
    async assignNewGameRoom(gameData) {
      this.resource = gameData.resource
      if (gameData.enemyId === 'computer') {
        this.enemyId = gameData.enemyId
        this.enemyStatus = 'ready'
        this.gameRoomId = 'singlePlayerRoom'
      } else {
        this.enemyId = gameData.enemyId
        this.enemyStatus = 'pending'
        this.gameRoomId = gameData.enemyId
      }
      return `/game/${this.gameRoomId}`
    },
  },
});
