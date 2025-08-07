<template>
  <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50"
    @click="open = true">
    <div class="text-4xl mb-2">➕</div>
    <div class="text-gray-600">Add a new game</div>

    <GameAddModal v-if="open" @close="close" @created="handleCreated" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GameAddModal from './GameAddModal.vue'

const open = ref(false)
const emit = defineEmits(['created'])

function close() {
  console.log('Closing...')
  open.value = false
}

function handleCreated() {
  emit('created')
  open.value = false
}
</script>
