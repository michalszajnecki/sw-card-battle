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

export const useUserData = defineStore('userData', {
  state: () => ({
    stats: {
      won: 0,
      lost: 0,
      lastMatches: [{ won: true, date: new Date().getTime() }],
    },
    deck: {
      people: [1, 2, 3, 4, 5],
      starships: [2, 3, 5, 9, 11],
      planets: [1, 2, 3, 4, 5],
    },
  }),
  actions: {
    async captureBattleResult(won: boolean) {
      this.stats[won ? 'won' : 'losts']++
      this.stats.lastMatches.push(
        {
          won: won,
          date: new Date().getTime()
        }
      )
    },

    async updateWeatherData() {
      try {
        const { data } = await axios.post(
          `http://${process.client ? 'localhost' : 'fm-backend'}:8012/api/v1/getForecast`,
          {
            latitude: 51.7706,
            longitude: 19.4739,
          },
        );
        this.weatherData = data;
        this.dailyWeatherData = data.dailyWeather;
        this.currentWeatherData = data.hourlyWeather.find((item) => {
          return areDatesEqual(new Date(), new Date(item.time));
        });
        return data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
      }
    },
  },
});
