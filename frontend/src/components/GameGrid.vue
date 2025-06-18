<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <template v-if="loading">
      <GameCardSkeletton v-for="n in 8" :key="n" />
    </template>
    <template v-else>
      <GameCardAdd v-if="userStore.isAuthenticated" @created="emit('refresh')" />
      <GameCard v-for="game in games" :key="game.id" :game="game" />
    </template>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import GameCard from './GameCard.vue'
import GameCardSkeletton from './GameCardSkeletton.vue'
import GameCardAdd from './GameCardAdd.vue'

const emit = defineEmits(['refresh'])

const userStore = useUserStore()

const props = defineProps({
  games: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>
