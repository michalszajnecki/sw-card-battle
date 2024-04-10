/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia';
import axios from 'axios';


export const useUserData = defineStore('userData', {
  state: () => ({
    stats: {
      won: 0,
      lost: 0,
      lastMatches: [{ won: true, timestamp: new Date().getTime() }],
    }
  }),
  actions: {
    async captureBattleResult(won: boolean) {
      this.stats[won ? 'won' : 'lost']++
      this.stats.lastMatches.push(
        {
          won: won,
          timestamp: new Date().getTime()
        }
      )
    },
    async updateData(userData) {
      this.stats.won = userData.won
      this.stats.lost = userData.lost
      this.stats.lastMatches = userData.lastMatches
      return true
    },

  },
});
