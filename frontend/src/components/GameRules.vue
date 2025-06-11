<template>
	<div>
		<h2 class="text-xl font-semibold mb-4">{{ $t('gameRules') }}</h2>
		<div class="prose max-w-none" v-html="compiledMarkdown" />
	</div>
</template>

<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps({
	rules: {
		type: String,
		required: true
	}
})

// const md = new MarkdownIt()
const md = new MarkdownIt({
	html: false, // disallow raw HTML
	linkify: true,
	// breaks: true
})

// const compiledMarkdown = computed(() => md.render(props.rules))

const compiledMarkdown = computed(() => md.render(props.rules))
</script>
