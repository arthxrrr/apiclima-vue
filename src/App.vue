<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from './shared/stores/theme'
import AppHeader from './shared/layout/AppHeader.vue'
import AppFooter from './shared/layout/AppFooter.vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
