<template>
  <div class="flex flex-col md:flex-row gap-6 items start">
    <img :src="`${UPLOADS_PATH}${game.boxImageUrl}`" :alt="game.title"
      class="w-full md:w-64 rounder-xl shadow-md object-cover" />
    <div class="flex-1 space-y-2">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ game.title }}</h1>
      <p class="text-sm text-gray-700 dark:text-gray-200">
        {{ game.minPlayers }}-{{ game.maxPlayers }} {{ $t('players') }} / {{ game.averageDuration }} {{ $t('min') }}
      </p>
      <p class="text-sm text-gray-600 dark:text-gray-300 italic">{{ game.company }}</p>
      <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">
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

const UPLOADS_PATH = import.meta.env.VITE_UPLOADS_PATH;
</script>
