/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia';

export const useBattleData = defineStore('battleData', {
  state: () => ({
    resource: 'people',
    enemyId: 'computer',
    gameRoomId: 1,
    enemyStatus: 'ready'
  }),
  actions: {
    async assignNewGameRoom(gameData): Promise<string> {
      this.resource = gameData.resource
      this.enemyId = gameData.enemyId
      this.enemyStatus = gameData.enemyId === 'computer' ? 'ready' : 'pending'
      this.gameRoomId = gameData.enemyId === 'computer' ? 'singlePlayerRoom' : gameData.enemyId

      return `/game/${this.gameRoomId}`
    },
  },
});
