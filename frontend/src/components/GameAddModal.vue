<template>
  <div class="fixed inset-0 bg-black/30 dark:bg-black/60 flex justify-center items-center z-50">
    <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
      <h2 class="text-xl font-bold">New Game</h2>

      <form @submit.prevent="submit">
        <input v-model="title"
          class="w-full rounded-lg px-3 py-2 my-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="text" placeholder="Title" required />
        <input v-model="company"
          class="w-full rounded-lg px-3 py-2 my-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="text" placeholder="Company" required />
        <input v-model="minPlayers"
          class="w-full rounded-lg px-3 py-2 my-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="number" placeholder="Min players" required />
        <input v-model="maxPlayers"
          class="w-full rounded-lg px-3 py-2 my-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="number" placeholder="Max players" required />
        <input v-model="averageDuration"
          class="w-full rounded-lg px-3 py-2 my-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="number" placeholder="Avg. duration (min)" required />
        <input v-model="boxContent"
          class="w-full rounded-lg px-3 py-2 my-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="text" placeholder="Box contents (e.g. 120 playing cards, 1 rulebook)" />

        <input type="file" accept="image/*" @change="setFile" class="block my-1 w-full text-sm text-gray-700 dark:text-gray-300
                 file:mr-4 file:py-2 file:px-3 file:rounded-md
                 file:border-0 file:text-sm file:font-medium
                 file:bg-blue-600 file:text-white hover:file:bg-blue-700
                 dark:file:bg-blue-500 dark:hover:file:bg-blue-600
                 focus:outline-none" />


        <div class="flex justify-end mt-4 space-x-2">
          <button type="button" class="text-sm" @click.stop="emit('close')">Cancel</button>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const title = ref('')
const company = ref('')
const minPlayers = ref(null)
const maxPlayers = ref(null)
const averageDuration = ref(null)
const boxContent = ref('')
const boxImage = ref(null)

const props = defineProps({ open: Boolean })
const emit = defineEmits(['update:open', 'created', 'close'])
const route = useRoute()

// const close = () => emit('close')

const setFile = (e) => {
  boxImage.value = e.target.files[0]
}

const submit = async () => {
  const lang = route.params.lang || 'en'

  const form = new FormData()
  form.append('title', title.value)
  form.append('company', company.value)
  form.append('minPlayers', minPlayers.value)
  form.append('maxPlayers', maxPlayers.value)
  form.append('averageDuration', averageDuration.value)
  form.append('boxContent', boxContent.value)
  form.append('lang', lang)
  if (boxImage.value) form.append('boxImage', boxImage.value)

  const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/games`, {
    method: 'POST',
    credentials: 'include',
    body: form
  })

  if (!res.ok) return alert('Failed to create game.')

  emit('created')
}
</script>
