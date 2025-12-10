<template>
  <div class="flex items-center justify-center" :class="sizeClass">
    <div class="relative">
      <div class="w-12 h-12 rounded-full border-4 border-purple-200 dark:border-purple-900"></div>
      <div class="w-12 h-12 rounded-full border-4 border-purple-600 border-t-transparent animate-spin absolute top-0 left-0"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-8'
  }
  return sizes[props.size]
})
</script>
