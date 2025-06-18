<template>
	<div>
		<h1 class="text-2xl font-bold mb-6">{{ $t('home') }}</h1>
		<GameGrid :games="games" :loading="loading" @refresh="fetchGames" />
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import GameGrid from '@/components/GameGrid.vue'

const games = ref([])
const loading = ref(true)

const fetchGames = async () => {
	console.log('fetching games')
	try {
		const res = await fetch(`http://localhost:3000/api/v1/games`)
		const data = await res.json()
		games.value = data.games
	} catch (e) {
		console.error('Failed to fetch games:', e)
	} finally {
		loading.value = false
	}
}

onMounted(async () => {
	await fetchGames()
})
</script>