<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useBattleData } from '../stores/battleData';

const rooms = ref([])
const battleDataStore = useBattleData()
const { getRooms, updateGameRoom } = useFirestoreDatabase()
const { user } = useFirebaseAuth()

async function joinRoom(room) {
  const newRoutePath = await battleDataStore.assignNewGameRoom({
    enemyId: room.id,
    resource: room.resourceType,
  })

  updateGameRoom(user.value.uid, room.id)
  navigateTo(newRoutePath)
}

onMounted(async () => {
  rooms.value = await getRooms()
})

function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
}
</script>

<template>
  <div class="lobby-list">
    <p class="lobby-list-is-empty" v-if="rooms.length === 0">Lobby is empty. Host new game or play single player match.
    </p>
    <div class="lobby-list-item" v-for="(item, i) in rooms" :key="i" :class="{
      'lobby-list-item--full': item.full
    }">
      <span class="room-created">
        Created: {{ formatDate(item.created) }}
      </span>
      <button class="lobby-list-item-btn" @click="joinRoom(item)">

        <div class="av-icon" :class="{
      'av-people': item.resourceType === 'people',
      'av-starships': item.resourceType === 'starships',
      'av-planets': item.resourceType === 'planets',
    }"></div><span>{{ item.full ? 'Battle in progress...' : 'Join battle' }}</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.lobby-list {
  display: flex;
  flex-wrap: wrap;
}

.lobby-list-item {
  background: #292847;
  border-radius: 1rem;
  padding: 2rem;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 1rem 5rem -2rem #FC0858, inset 0 -1rem 6rem -4rem #FC0858;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 2rem;
  width: 100%;
  max-width: 24rem;
  transition: all ease .3s;

  &.lobby-list-item--full {
    pointer-events: none;
    opacity: .7;
  }

  &:hover {
    box-shadow: 0 1rem 5rem -2rem #FC0858, inset 0 -1rem 9rem -4rem #FC0858
  }
}

.room-created {
  margin: 0rem auto 2rem;
}

.av-icon {
  width: 5rem;
  height: 5rem;
  border: .1rem solid #fff;
  background-size: cover;
  border-radius: 100%;

  &.av-people {
    background-image: url('/people.webp');
  }

  &.av-starships {
    background-image: url('/starships.webp');
  }

  &.av-planets {
    background-image: url('/planets.webp');
  }
}

button.lobby-list-item-btn {
  background: #FC0858;
  display: flex;
  align-items: center;
  border-radius: 2.9rem;
}

button.lobby-list-item-btn span {
  padding: 0 2rem 0 1rem;
  text-transform: uppercase;
}

.lobby-list-is-empty {
  font-size: 1.4rem;
  font-weight: bold;
  color: #FC0858;
  width: 100%;
  text-align: center;
  padding: 2rem 0;
  opacity: 0.7;
  user-select: none;
}
</style>
