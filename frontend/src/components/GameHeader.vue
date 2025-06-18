<template>
  <div class="flex flex-col md:flex-row gap-6 items start">
    <img :src="`${BACKEND_URL}${game.boxImageUrl}`" :alt="game.title"
      class="w-full md:w-64 rounder-xl shadow-md object-cover" />
    <div class="flex-1 space-y-2">
      <h1 class="text-2xl font-bold text-gray-900">{{ game.title }}</h1>
      <p class="text-sm text-gray-700">
        {{ game.minPlayers }}-{{ game.maxPlayers }} {{ $t('players') }} / {{ game.averageDuration }} {{ $t('min') }}
      </p>
      <p class="text-sm text-gray-600 italic">{{ game.company }}</p>
      <p class="text-sm text-gray-600 mt-2">
        📦 {{ boxContent }}
      </p>
    </div>
  </div>
</template>


<script setup>
const props = defineProps({
  game: {
    type: Object,
    required: true
  },
  boxContent: {
    type: [String, null],
    required: true
  }
})

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
</script>
