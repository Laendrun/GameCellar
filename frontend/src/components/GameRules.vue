<template>
  <div class="relative">
    <h2 class="text-xl font-semibold mb-4">{{ $t('gameRules') }}</h2>

    <!-- Display Mode -->
    <div v-if="!isEditing">
      <!-- <p v-if="boxContent" class="text-sm mb-4 text-gray-700">{{ boxContent }}</p> -->
      <div class="prose max-w-none" v-html="compiledMarkdown" />
    </div>

    <!-- Edit Mode -->
    <div v-else class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">{{ $t('boxContent') }}</label>
        <input v-model="editableBoxContent" type="text" class="w-full border px-3 py-2 rounded text-sm" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">{{ $t('rules') }}</label>
        <textarea v-model="editableRules" class="w-full p-3 border rounded h-64 font-mono text-sm"></textarea>
      </div>

      <div class="flex justify-end gap-2">
        <button @click="cancel" class="bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded text-sm">
          {{ $t('cancel') }}
        </button>
        <button @click="save" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm">
          {{ $t('save') }}
        </button>
      </div>
    </div>

    <!-- Edit Button -->
    <button v-if="isAuthenticated && !isEditing" @click="startEdit"
      class="absolute top-0 right-0 text-sm text-blue-600 hover:underline">
      ✏️ {{ $t('edit') }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue'
import MarkdownIt from 'markdown-it'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const emit = defineEmits(['change'])

const props = defineProps({
  rules: { type: String, required: true },
  gameId: { type: String, required: true },
  boxContent: { type: String, required: true },
  user: { type: [Object, null], required: true }
})

const route = useRoute()
const md = new MarkdownIt()

const editableRules = ref('')
const editableBoxContent = ref('')
const isEditing = ref(false)


const isAuthenticated = computed(() => userStore.isAuthenticated)
const compiledMarkdown = computed(() => md.render(props.rules))

const startEdit = () => {
  editableRules.value = props.rules
  editableBoxContent.value = props.boxContent
  isEditing.value = true
}

const cancel = () => {
  isEditing.value = false
}

const save = async () => {
  try {
    const lang = route.params.lang || 'en'
    const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/games/${props.gameId}/translations/${lang}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        rules: editableRules.value,
        boxContent: editableBoxContent.value
      })
    })

    if (!res.ok) {
      console.error('Failed to save rules')
      return
    }

    isEditing.value = false
    emit('change')
  } catch (err) {
    console.error('Error saving rules:', err)
  }
}
</script>