
<template>
  <header class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between gap-4">
        <router-link to="/" class="flex items-center gap-2.5 group">
          <div class="bg-blue-500 text-white p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
            </svg>
          </div>
          <span class="text-xl font-bold text-slate-800 tracking-tight">
            Arthur<span class="text-blue-500"> Henrique</span>
          </span>
        </router-link>
        
        <div class="flex-1 max-w-sm hidden md:block">
          <CitySearch />
        </div>
        
        <div class="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>

      <div class="md:hidden mt-3 pb-1">
        <CitySearch />
      </div>
    </div>
  </header>
</template>

<script setup>
import CitySearch from '../../modules/location/components/CitySearch.vue'
import ThemeToggle from '../ui/ThemeToggle.vue'
</script>
