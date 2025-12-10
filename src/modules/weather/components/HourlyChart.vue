<template>
  <div class="card animate-fade-in">
    <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
      Temperatura - 24h
    </h3>
    
    <div class="h-64">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { getHour } from '../../../shared/utils/dateTime'
import { useThemeStore } from '../../../shared/stores/theme'
import { storeToRefs } from 'pinia'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const props = defineProps({
  hourly: {
    type: Array,
    required: true
  }
})

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

const chartData = computed(() => ({
  labels: props.hourly.map(h => getHour(h.time)),
  datasets: [
    {
      label: 'Temperatura (°C)',
      data: props.hourly.map(h => h.temperature),
      borderColor: isDark.value ? 'rgb(168, 85, 247)' : 'rgb(147, 51, 234)',
      backgroundColor: isDark.value 
        ? 'rgba(168, 85, 247, 0.1)' 
        : 'rgba(147, 51, 234, 0.1)',
      tension: 0.4,
      fill: true,
      pointRadius: 3,
      pointHoverRadius: 6,
      pointBackgroundColor: isDark.value ? 'rgb(168, 85, 247)' : 'rgb(147, 51, 234)',
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: isDark.value ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      titleColor: isDark.value ? '#f3f4f6' : '#111827',
      bodyColor: isDark.value ? '#f3f4f6' : '#111827',
      borderColor: isDark.value ? '#4b5563' : '#e5e7eb',
      borderWidth: 1,
      padding: 12,
      displayColors: false,
      callbacks: {
        label: (context) => `${context.parsed.y}°C`
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: isDark.value ? '#9ca3af' : '#6b7280',
        maxRotation: 0
      }
    },
    y: {
      grid: {
        color: isDark.value ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)'
      },
      ticks: {
        color: isDark.value ? '#9ca3af' : '#6b7280',
        callback: (value) => `${value}°`
      }
    }
  }
}))
</script>
