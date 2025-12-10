<template>
  <component :is="iconComponent" :class="['w-full h-full', colorClass]" />
</template>

<script setup>
import { computed } from 'vue'
import {
  SunIcon,
  CloudIcon,
  MoonIcon,
} from '@heroicons/vue/24/solid'
import { getWeatherInfo } from '../../../shared/utils/weatherCodes'

const props = defineProps({
  weatherCode: {
    type: Number,
    required: true
  },
  size: {
    type: String,
    default: 'md'
  }
})

const weatherInfo = computed(() => getWeatherInfo(props.weatherCode))
const colorClass = computed(() => weatherInfo.value.color)

const iconComponent = computed(() => {
  const iconType = weatherInfo.value.icon
  
  const iconMap = {
    'sun': SunIcon,
    'cloud': CloudIcon,
    'cloud-sun': CloudIcon,
    'cloud-rain': CloudIcon,
    'cloud-drizzle': CloudIcon,
    'cloud-snow': CloudIcon,
    'cloud-lightning': CloudIcon,
    'fog': CloudIcon,
    'moon': MoonIcon
  }
  
  return iconMap[iconType] || CloudIcon
})
</script>
