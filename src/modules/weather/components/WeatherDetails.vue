<template>
  <div class="animate-enter delay-200 mt-6">
    <div class="grid grid-cols-3 gap-4">
      
       <!-- umidade -->
       <div class="card flex flex-col items-center justify-center p-4 text-center hover:border-blue-200 group">
         <div class="p-2 mb-2 bg-blue-50 text-blue-500 rounded-full group-hover:bg-blue-100 transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
               <path fill-rule="evenodd" d="M10 2c-1.716 5.5-5.5 8.5-5.5 11.5a5.5 5.5 0 0011 0c0-3-3.784-6-5.5-11.5zm0 2c1.373 4.6 3.5 7.068 3.5 9.5a3.5 3.5 0 01-7 0c0-2.432 2.127-4.9 3.5-9.5z" clip-rule="evenodd"/>
            </svg>
         </div>
         <span class="text-xs text-slate-400 font-semibold uppercase tracking-wide">Umidade</span>
         <span class="text-xl font-bold text-slate-800 dark:text-slate-200">{{ weather.humidity }}%</span>
       </div>
 
       <!-- vento -->
       <div class="card flex flex-col items-center justify-center p-4 text-center hover:border-blue-200 group">
         <div class="p-2 mb-2 bg-blue-50 text-blue-500 rounded-full group-hover:bg-blue-100 transition-colors">
             <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 256 256">
               <path d="M184,184H69.8L41.9,156.1a8,8,0,0,0-11.3,11.3l27.9,27.9A8,8,0,0,0,64.2,200H184a8,8,0,0,0,0-16Zm-56-72H24a8,8,0,0,0,0,16H128a32,32,0,0,1,0,64H112a8,8,0,0,0,0,16h16a48,48,0,0,0,0-96Zm88-32H88a48,48,0,0,0,0,96h8a8,8,0,0,0,0-16h-8a32,32,0,0,1,0-64H216a8,8,0,0,0,0-16Z"></path>
             </svg>
         </div>
         <span class="text-xs text-slate-400 font-semibold uppercase tracking-wide">Vento</span>
         <span class="text-xl font-bold text-slate-800 dark:text-slate-200">{{ weather.windSpeed }} <span class="text-xs text-slate-500">km/h</span></span>
       </div>

      <!-- nuvens -->
      <div class="card flex flex-col items-center justify-center p-4 text-center hover:border-blue-200 group">
        <div class="p-3 mb-2 bg-blue-50 text-blue-400 rounded-full group-hover:bg-blue-100 transition-colors">
           <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
            </svg>
        </div>
        <span class="text-sm text-slate-500 font-bold uppercase tracking-wide">Nuvens</span>
        <span class="text-2xl font-black text-slate-800">{{ weather.cloudCover }}%</span>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  weather: {
    type: Object,
    required: true
  }
})
</script>
