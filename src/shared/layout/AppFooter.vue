<template>
  <footer class="mt-12 py-8 text-center border-t border-slate-100 bg-white">
    <div class="container mx-auto px-4">
      <p class="text-slate-400 text-sm font-medium">
        © {{ currentYear }} Arthur Henrique
      </p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
