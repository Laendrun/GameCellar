<template>
	<div class="min-h-screen flex flex-col bg-gray-50 text-gray-900">
		<!-- Header -->
		<header class="bg-white shadow p-4 flex justify-between items-center">
			<RouterLink :to="`/${lang}`" class="text-xl font-bold text-blue-600 hover:text-blue-800">Game Cellar</RouterLink>
			<!-- Language Switcher -->
			<div class="space-x-2">
				<button v-for="code in supportedLanguages" :key="code" :disabled="code === lang" @click="switchLanguage(code)"
					:class="code === lang ? 'bg-blue-500 text-white' : 'bg-white text-blue-600 border-blue-500'"
					class="cursor-pointer">
					{{ code.toUpperCase() }}
				</button>
			</div>
		</header>
		<!-- Main content -->
		<main class="flex-1 p-6">
			<RouterView />
		</main>

		<!-- Footer -->
		<footer class="bg-white text-center p-4 text-sm text-gray-500">
			&copy; {{ new Date().getFullYear() }} Game Cellar
		</footer>
	</div>
</template>

<script setup>
import { watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const route = useRoute()
const router = useRouter()
const lang = computed(() => route.params.lang)

watch(lang, (newLang) => {
	locale.value = newLang
})

const supportedLanguages = ['en', 'fr']

const switchLanguage = (code) => {
	if (code === lang) return
	const newPath = `/${code}${route.fullPath.replace(/^\/[^/]+/, '')}`
	router.push(newPath)
}
</script>