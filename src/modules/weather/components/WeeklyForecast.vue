<template>
  <div class="animate-enter delay-200 mt-8">
    <div class="flex items-center justify-between mb-4 px-1">
       <h3 class="text-lg font-bold text-slate-800">Próximos 7 dias</h3>
       <span class="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">Semanal</span>
    </div>
    
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-1">
      <div
        v-for="(day, index) in daily"
        :key="index"
        class="flex items-center justify-between py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 rounded-xl px-2 transition-colors group"
      >
        <!-- nome do dia -->
        <div class="w-24">
          <p class="font-bold text-slate-700 text-base">
            {{ getDayName(day.date) }}
          </p>
          <p class="text-xs text-slate-400 font-medium">
            {{ formatDateShort(day.date) }}
          </p>
        </div>
        
        <!-- probabilidade de chuva -->
        <div class="w-16 flex justify-center">
           <div class="flex flex-col items-center">
             <span class="text-[10px] font-bold text-blue-500 bg-blue-50 px-1.5 rounded-sm">{{ day.precipitationProbability }}%</span>
             <span class="text-[9px] text-blue-400 font-medium mt-0.5">chuva</span>
           </div>
        </div>

<div class="w-10 h-10 text-slate-600 dark:text-slate-300 group-hover:scale-110 transition-transform duration-200 flex justify-center">
          <WeatherIcon :weather-code="day.weatherCode" class="!text-current" />
        </div>
        
        <!-- temperatura min e max -->
        <div class="flex flex-col gap-1 w-32 items-end">
          <div class="flex items-center gap-3 w-full justify-end">
            <span class="text-sm font-medium text-slate-500 w-6 text-right">{{ Math.round(day.tempMin) }}°</span>
            
            <!-- barra de temperatura -->
            <div class="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden relative max-w-[80px]">
               <div class="absolute inset-0 bg-gradient-to-r from-blue-300 to-amber-400 opacity-70"></div>
            </div>
            
            <span class="text-sm font-bold text-slate-800 w-6 text-right">{{ Math.round(day.tempMax) }}°</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import WeatherIcon from './WeatherIcon.vue'
import { getDayName, formatDateShort } from '../../../shared/utils/dateTime'

defineProps({
  daily: {
    type: Array,
    required: true
  }
})
</script>
