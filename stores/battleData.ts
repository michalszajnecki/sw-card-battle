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
        // TODO: add gameroom generator
      }
      if (gameData.enemyId === 'player') {
        this.enemyId = gameData.enemyId
        this.enemyStatus = 'ready'
        this.gameRoomId = gameData.enemyId
        // TODO: add gameroom generator
      }
      return `/game/${this.gameRoomId}`

      // try {
      //   const { data } = await axios.post(
      //     `http://${process.client ? 'localhost' : 'fm-backend'}:8012/api/v1/getForecast`,
      //     {
      //       latitude: 51.7706,
      //       longitude: 19.4739,
      //     },
      //   );
      //   this.weatherData = data;
      //   this.dailyWeatherData = data.dailyWeather;
      //   this.currentWeatherData = data.hourlyWeather.find((item) => {
      //     return areDatesEqual(new Date(), new Date(item.time));
      //   });
      //   return data;
      // } catch (error) {
      //   console.error('Error fetching weather data:', error);
      //   throw error;
      // }
    },
  },
});
