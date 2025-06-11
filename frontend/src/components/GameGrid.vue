<template>
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
		<template v-if="loading">
			<GameCardSkeletton v-for="n in 8" :key="n" />
		</template>
		<template v-else>
			<GameCard v-for="game in games" :key="game.id" :game="game" />
		</template>
	</div>
</template>

<script setup>
import GameCard from './GameCard.vue'
import GameCardSkeletton from './GameCardSkeletton.vue'

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
