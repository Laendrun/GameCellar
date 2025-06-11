<template>
	<div class="bg-white rounded-2xl shadow hover:shadow-md transition cursor-pointer overflow-hidden" @click="goToGame">
		<img :src="`http://localhost:3000${game.boxImageUrl}`" :alt="game.title" class="w-full h-48 object-cover" />

		<div class="p-4">
			<h2 class="text-lg font-semibold text-gray-900 truncate">{{ game.title }}</h2>
			<p class="text-sm text-gray-600 mt-1">
				{{ game.minPlayers }}-{{ game.maxPlayers }} {{ $t('players') }} / {{ game.averageDuration }} {{ $t('min') }}
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

const router = useRouter()
const route = useRoute()

function goToGame() {
	const lang = route.params.lang || 'en'
	router.push(`/${lang}/game/${props.game.id}`)
}
</script>

<style></style>