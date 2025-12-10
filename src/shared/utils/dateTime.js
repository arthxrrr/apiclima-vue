
/**
 * @param {string} dateString 
 * @returns {string} 
 */
export function formatDate(dateString) {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }).format(date)
}

/**
 * @param {string} dateString 
 * @returns {string} 
 */
export function formatDateShort(dateString) {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit'
    }).format(date)
}

/**
 * @param {string} dateString 
 * @returns {string} 
 */
export function getDayName(dateString) {
    const date = new Date(dateString)
    const today = new Date()

    // Normalize to compare only dates (ignore time)
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const tomorrowOnly = new Date(todayOnly)
    tomorrowOnly.setDate(tomorrowOnly.getDate() + 1)

    if (dateOnly.getTime() === todayOnly.getTime()) {
        return 'Hoje'
    }

    if (dateOnly.getTime() === tomorrowOnly.getTime()) {
        return 'Amanhã'
    }

    return new Intl.DateTimeFormat('pt-BR', {
        weekday: 'long'
    }).format(date)
}

/**
 * @param {string} dateString 
 * @returns {string} 
 */
export function formatTime(dateString) {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    }).format(date)
}

/**
 * @param {string} dateString 
 * @returns {string} 
 */
export function getHour(dateString) {
    const date = new Date(dateString)
    return `${date.getHours()}h`
}

/**
 * @param {string} time 
 * @param {string} sunrise 
 * @param {string} sunset 
 * @returns {boolean} 
 */
export function isDaytime(time, sunrise, sunset) {
    const current = new Date(time)
    const sunriseTime = new Date(sunrise)
    const sunsetTime = new Date(sunset)

    return current >= sunriseTime && current <= sunsetTime
}

/**
 * @param {string} dateString 
 * @returns {string} 
 */
export function getRelativeTime(dateString) {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'agora'
    if (diffMins < 60) return `há ${diffMins} minuto${diffMins > 1 ? 's' : ''}`
    if (diffHours < 24) return `há ${diffHours} hora${diffHours > 1 ? 's' : ''}`
    return `há ${diffDays} dia${diffDays > 1 ? 's' : ''}`
}
