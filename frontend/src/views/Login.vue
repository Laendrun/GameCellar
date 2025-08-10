<template>
  <div class="max-w-sm mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded-xl shadow dark:shadow-gray-900 space-y-6">
    <h1 class="text-2xl font-bold text-center">{{ $t('login') }}</h1>

    <form @submit.prevent="login" class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-200">{{ $t('username')
        }}</label>
        <input v-model="username" type="text"
          class="w-full rounded-lg px-3 py-2 my-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          name="username" id="username_input" required />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-200">{{ $t('password')
          }}</label>
        <input v-model="password" type="password"
          class="w-full rounded-lg px-3 py-2 my-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required />
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
    const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/auth/login`, {
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