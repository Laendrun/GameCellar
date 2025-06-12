<template>
	<div class="max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow space-y-6">
		<h1 class="text-2xl font-bold text-center">{{ $t('login') }}</h1>

		<form @submit.prevent="login" class="space-y-4">
			<div>
				<label for="username" class="block text-sm font-medium text-gray-700">{{ $t('username') }}</label>
				<input v-model="username" type="text" class="w-full border border-gray-300 rounded p-2 mt-1" name="username"
					id="username_input" required />
			</div>
			<div>
				<label for="password" class="block text-sm font-medium text-gray-700">{{ $t('password') }}</label>
				<input v-model="password" type="password" class="w-full border border-gray-300 rounded p-2 mt-1" required />
			</div>

			<div v-if="error" class="text-red-600 text-sm">{{ error }}</div>

			<button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
				{{ $t('login-btn') }}
			</button>
		</form>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const userStore = useUserStore()
const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const route = useRoute()
const lang = computed(() => route.params.lang || 'en')

const login = async () => {
	error.value = ''
	try {
		const res = await fetch('http://localhost:3000/api/v1/auth/login', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({ username: username.value, password: password.value })
		})

		if (!res.ok) {
			error.value = t('invalid-credentials')
			return
		}
		await userStore.fetchUser()
		router.push(`/${lang}`)
	} catch (err) {
		error.value = t('login-error')
		console.error(err)
	}
}
</script>