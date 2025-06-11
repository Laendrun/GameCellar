<template>
	<div v-if="loading" class="text-center text-gray-500">Loading...</div>
	<div v-else-if="!game" class="text-center text-red-500">Game not found.</div>
	<div v-else class="max-w-4xl mx-auto p-6 space-y-6">
		<GameHeader :game="game" />

		<GameRules :rules="translatedRules" />

		<!-- <BuyLinks v-if="game.buyLinks?.length" :links="game.buyLinks" /> -->
	</div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import GameHeader from '@/components/GameHeader.vue'
import GameRules from '@/components/GameRules.vue'
// import BuyLinks from '@/components/BuyLinks.vue'

const route = useRoute()
const game = ref(null)
const loading = ref(true)
const currentLang = computed(() => route.params.lang || 'en')

const fetchGame = async (lang) => {
	loading.value = true
	try {
		const res = await fetch(`http://localhost:3000/api/v1/games/${route.params.id}?lang=${lang}`)
		const data = await res.json()
		game.value = data.game
	} catch (e) {
		console.error('Failed to load game:', e)
		game.value = null
	} finally {
		loading.value = false
	}
}

onMounted(() => fetchGame(currentLang.value))

watch(currentLang, (newLang) => {
	const hasTranslation = game.value?.translations.some(t => t.lang === newLang)
	if (!hasTranslation) {
		fetchGame(newLang)
	}
})

const translatedRules = computed(() => {
	if (!game.value) return null
	const match = game.value.translations.find(t => t.lang === currentLang.value)
	return match?.rules || 'No rules available in this language.'
})

// const translatedRules = computed(() => {
// 	if (!game.value) return null
// 	const currentLang = route.params.lang || 'en'
// 	const match = game.value.translations.find(t => t.lang === currentLang)
// 	return match?.rules || 'No rules available in this language.'
// })

// onMounted(async () => {
// 	loading.value = true
// 	try {
// 		const lang = route.params.lang || 'en'
// 		const res = await fetch(`http://localhost:3000/api/v1/games/${route.params.id}?lang=${lang}`)
// 		const data = await res.json()
// 		game.value = data.game
// 	} catch (e) {
// 		console.error(e)
// 	} finally {
// 		loading.value = false
// 	}
// })
</script>
