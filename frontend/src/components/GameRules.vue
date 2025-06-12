<template>
	<div class="relative">
		<h2 class="text-xl font-semibold mb-4">{{ $t('gameRules') }}</h2>
		<div v-if="!isEditing" v-html="compiledMarkdown" class="prose max-w-none"></div>
		<div v-else>
			<textarea v-model="editableRules" class="w-full p-3 border rounded h-64 font-mono"></textarea>
			<div class="flex justify-end mt-2 gap-2">
				<button class="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-1 rounded" @click="cancel">
					{{ $t('cancel') }}
				</button>
				<button class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded" @click="save">
					{{ $t('save') }}
				</button>
			</div>
		</div>
		<button v-if="isAuthenticated && !isEditing" class="absolute top-0 right-0 text-sm text-blue-600 hover:underline"
			@click="startEdit">
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
	user: { type: [Object, null], required: true }
})

const route = useRoute()
const md = new MarkdownIt()

const editableRules = ref('')
const isEditing = ref(false)


const isAuthenticated = computed(() => userStore.isAuthenticated)
const compiledMarkdown = computed(() => md.render(props.rules))

const startEdit = () => {
	editableRules.value = props.rules
	isEditing.value = true
}

const cancel = () => {
	isEditing.value = false
}

const save = async () => {
	try {
		const lang = route.params.lang || 'en'
		const res = await fetch(`http://localhost:3000/api/v1/games/${props.gameId}/translations/${lang}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({ rules: editableRules.value })
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