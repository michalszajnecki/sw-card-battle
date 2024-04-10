/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia';
import axios from 'axios';

function areDatesEqual(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate() &&
    date1.getHours() === date2.getHours()
  );
}

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
      } else if (gameData.enemyId === 'player') {
        this.enemyId = gameData.enemyId
        this.enemyStatus = 'pending'
        this.gameRoomId = gameData.enemyId
      }
      return `/game/${this.gameRoomId}`
    },
  },
});
