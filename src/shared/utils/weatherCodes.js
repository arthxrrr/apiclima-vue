
export const weatherCodes = {
    0: {
        description: 'Céu limpo',
        icon: 'sun',
        color: 'text-yellow-500'
    },
    1: {
        description: 'Principalmente limpo',
        icon: 'sun',
        color: 'text-yellow-400'
    },
    2: {
        description: 'Parcialmente nublado',
        icon: 'cloud-sun',
        color: 'text-gray-400'
    },
    3: {
        description: 'Nublado',
        icon: 'cloud',
        color: 'text-gray-500'
    },
    45: {
        description: 'Neblina',
        icon: 'fog',
        color: 'text-gray-400'
    },
    48: {
        description: 'Neblina com geada',
        icon: 'fog',
        color: 'text-blue-300'
    },
    51: {
        description: 'Garoa leve',
        icon: 'cloud-drizzle',
        color: 'text-blue-400'
    },
    53: {
        description: 'Garoa moderada',
        icon: 'cloud-drizzle',
        color: 'text-blue-500'
    },
    55: {
        description: 'Garoa intensa',
        icon: 'cloud-drizzle',
        color: 'text-blue-600'
    },
    56: {
        description: 'Garoa gelada leve',
        icon: 'cloud-drizzle',
        color: 'text-blue-300'
    },
    57: {
        description: 'Garoa gelada intensa',
        icon: 'cloud-drizzle',
        color: 'text-blue-400'
    },
    61: {
        description: 'Chuva leve',
        icon: 'cloud-rain',
        color: 'text-blue-500'
    },
    63: {
        description: 'Chuva moderada',
        icon: 'cloud-rain',
        color: 'text-blue-600'
    },
    65: {
        description: 'Chuva forte',
        icon: 'cloud-rain',
        color: 'text-blue-700'
    },
    66: {
        description: 'Chuva gelada leve',
        icon: 'cloud-rain',
        color: 'text-blue-400'
    },
    67: {
        description: 'Chuva gelada forte',
        icon: 'cloud-rain',
        color: 'text-blue-500'
    },
    71: {
        description: 'Neve leve',
        icon: 'cloud-snow',
        color: 'text-blue-200'
    },
    73: {
        description: 'Neve moderada',
        icon: 'cloud-snow',
        color: 'text-blue-300'
    },
    75: {
        description: 'Neve forte',
        icon: 'cloud-snow',
        color: 'text-blue-400'
    },
    77: {
        description: 'Granizo',
        icon: 'cloud-snow',
        color: 'text-blue-300'
    },
    80: {
        description: 'Pancadas de chuva leves',
        icon: 'cloud-rain',
        color: 'text-blue-500'
    },
    81: {
        description: 'Pancadas de chuva moderadas',
        icon: 'cloud-rain',
        color: 'text-blue-600'
    },
    82: {
        description: 'Pancadas de chuva fortes',
        icon: 'cloud-rain',
        color: 'text-blue-700'
    },
    85: {
        description: 'Pancadas de neve leves',
        icon: 'cloud-snow',
        color: 'text-blue-300'
    },
    86: {
        description: 'Pancadas de neve fortes',
        icon: 'cloud-snow',
        color: 'text-blue-400'
    },
    95: {
        description: 'Tempestade',
        icon: 'cloud-lightning',
        color: 'text-slate-700'
    },
    96: {
        description: 'Tempestade com granizo leve',
        icon: 'cloud-lightning',
        color: 'text-slate-700'
    },
    99: {
        description: 'Tempestade com granizo forte',
        icon: 'cloud-lightning',
        color: 'text-slate-800'
    }
}

/**
 * @param {number} code 
 * @returns {Object} 
 */
export function getWeatherInfo(code) {
    return weatherCodes[code] || {
        description: 'Desconhecido',
        icon: 'cloud',
        color: 'text-gray-500'
    }
}

/**
 * @param {number} code 
 * @returns {string} 
 */
export function getWeatherDescription(code) {
    return getWeatherInfo(code).description
}

/**
 * @param {number} code 
 * @returns {string} 
 */
export function getWeatherIcon(code) {
    return getWeatherInfo(code).icon
}

/**
 * @param {number} code 
 * @returns {string} 
 */
export function getWeatherColor(code) {
    return getWeatherInfo(code).color
}
