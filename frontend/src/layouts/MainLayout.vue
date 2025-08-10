<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
    <!-- Header -->
    <header class="bg-white shadow dark:bg-gray-800 dark:shadow-gray-900 p-4 flex justify-between items-center">
      <RouterLink :to="`/${lang}`" class="text-xl font-bold text-blue-600 hover:text-blue-800">Game Cellar</RouterLink>
      <div v-if="userStore.isAuthenticated" class="text-sm text-green-400 font-medium dark:text-green-400"
        @click="logout">
        🔐 Logged in as <strong>{{ userStore.currentUser.username }}</strong>
      </div>
      <!-- Language Switcher -->
      <!-- <div class="space-x-2">
        <button v-for="code in supportedLanguages" :key="code" :disabled="code === lang" @click="switchLanguage(code)"
          :class="code === lang ? 'bg-blue-500 text-white' : 'bg-white text-blue-600 border-blue-500'"
          class="cursor-pointer">
          {{ code.toUpperCase() }}
        </button>
      </div> -->
      <!-- Theme Switcher -->
      <button @click="switchTheme"
        class="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full">
        <!-- Rotation wrapper -->
        <span class="transition-transform duration-500 ease-in-out transform"
          :class="theme === 'dark' ? 'rotate-180' : 'rotate-0'">
          <!-- Fade transition for icon swap -->
          <transition name="fade" mode="out-in">
            <MoonIcon v-if="theme === 'light'" key="moon" class="w-5 h-5" />
            <SunIcon v-else key="sun" class="w-5 h-5" />
          </transition>
        </span>
      </button>
    </header>
    <!-- Main content -->
    <main class="flex-1 p-6">
      <RouterView :user="user" />
    </main>

    <!-- Footer -->
    <footer class="bg-white text-center p-4 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400">
      &copy; {{ new Date().getFullYear() }} Game Cellar
    </footer>
  </div>
</template>

<script setup>
import { watch, computed, ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'
const { locale } = useI18n()

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const lang = computed(() => route.params.lang)
const user = ref(null)
const theme = ref('light')

watch(lang, (newLang) => {
  locale.value = newLang
})

const supportedLanguages = ['en', 'fr']

const switchLanguage = (code) => {
  if (code === lang) return
  const newPath = `/${code}${route.fullPath.replace(/^\/[^/]+/, '')}`
  router.push(newPath)
}

const applyTheme = (newTheme) => {
  theme.value = newTheme
  document.documentElement.classList.toggle('dark', newTheme === 'dark')
  localStorage.setItem('theme', newTheme)
}

const switchTheme = () => {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark')
}

onMounted(() => {
  // Load saved theme
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme) {
    applyTheme(savedTheme)
  } else {
    // Fallback: system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme(prefersDark ? 'dark' : 'light')
  }

  userStore.fetchUser()
})

const logout = async () => {
  await fetch(`${import.meta.env.VITE_API_URL}/v1/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  })
  userStore.logout()
}

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>