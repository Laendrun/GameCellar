<template>
  <div class="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
      <h2 class="text-xl font-bold">New Game</h2>

      <form @submit.prevent="submit">
        <input v-model="title" class="w-full border border-gray-300 rounded px-3 py-2 my-1" type="text"
          placeholder="Title" required />
        <input v-model="company" class="w-full border border-gray-300 rounded px-3 py-2 my-1" type="text"
          placeholder="Company" required />
        <input v-model="minPlayers" class="w-full border border-gray-300 rounded px-3 py-2 my-1" type="number"
          placeholder="Min players" required />
        <input v-model="maxPlayers" class="w-full border border-gray-300 rounded px-3 py-2 my-1" type="number"
          placeholder="Max players" required />
        <input v-model="averageDuration" class="w-full border border-gray-300 rounded px-3 py-2 my-1" type="number"
          placeholder="Avg. duration (min)" required />
        <input v-model="boxContent" class="input" type="text"
          placeholder="Box contents (e.g. 120 playing cards, 1 rulebook)" />

        <input type="file" accept="image/*" @change="setFile" class="block text-sm mt-2" />


        <div class="flex justify-end mt-4 space-x-2">
          <button type="button" class="text-sm" @click="emit('close')">Cancel</button>
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
const minPlayers = ref(2)
const maxPlayers = ref(4)
const averageDuration = ref(30)
const boxContent = ref('')
const boxImage = ref(null)

const emit = defineEmits(['close', 'created'])
const route = useRoute()

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
