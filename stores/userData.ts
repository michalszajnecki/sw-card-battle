/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia';

interface lastMatches {
  won: boolean;
  timestamp: number;
}

interface userStats {
  won: number;
  lost: number;
  lastMatches: lastMatches[]
}

interface userWonLostData {
  won: number;
  lost: number;
}
export const useUserData = defineStore('userData', {
  state: () => ({
    stats: {
      won: 0,
      lost: 0,
      lastMatches: [{ won: true, timestamp: new Date().getTime() }],
    }
  }),
  actions: {
    async captureBattleResult(won: boolean): Promise<userStats> {
      this.stats[won ? 'won' : 'lost']++
      this.stats.lastMatches.push(
        {
          won: won,
          timestamp: new Date().getTime()
        }
      )
      return {
        won: this.stats.won,
        lost: this.stats.lost,
        lastMatches: this.stats.lastMatches,
      }
    },
    async updateData(userData): Promise<boolean> {
      this.stats.won = userData.won
      this.stats.lost = userData.lost
      this.stats.lastMatches = userData.lastMatches
      return true
    },
    async getWonLostData(): Promise<userWonLostData> {
      return { won: this.$state.stats.won, lost: this.$state.stats.lost }
    },

  },
});
