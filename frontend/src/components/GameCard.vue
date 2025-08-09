<template>
  <div class="rounded-2xl overflow-hidden cursor-pointer
           bg-white dark:bg-gray-900
           text-gray-900 dark:text-gray-100
           shadow ring-1 ring-black/5 dark:ring-white/10
           hover:shadow-md transition" @click="goToGame">
    <img :src="`${UPLOADS_PATH}${game.boxImageUrl}`" :alt="game.title"
      class="w-full h-48 object-cover bg-gray-100 dark:bg-gray-800" />

    <div class="p-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
        {{ game.title }}
      </h2>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {{ game.minPlayers }}-{{ game.maxPlayers }} {{ $t('players') }} /
        {{ game.averageDuration }} {{ $t('min') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  game: {
    type: Object,
    required: true
  }
})

const UPLOADS_PATH = import.meta.env.VITE_UPLOADS_PATH;

const router = useRouter()
const route = useRoute()

function goToGame() {
  const lang = route.params.lang || 'en'
  router.push(`/${lang}/game/${props.game.id}`)
}
</script>
