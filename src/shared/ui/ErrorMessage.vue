<template>
  <div class="card bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 animate-fade-in">
    <div class="flex items-start gap-3">
      <svg class="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div class="flex-1">
        <h3 class="font-semibold text-red-800 dark:text-red-200 mb-1">
          {{ title }}
        </h3>
        <p class="text-red-700 dark:text-red-300 text-sm">
          {{ message }}
        </p>
        <button
          v-if="retry"
          @click="$emit('retry')"
          class="mt-3 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Erro'
  },
  message: {
    type: String,
    required: true
  },
  retry: {
    type: Boolean,
    default: false
  }
})

defineEmits(['retry'])
</script>
