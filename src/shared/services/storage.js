/* LocalStorage  */

const THEME_KEY = 'weather-app-theme'
const RECENT_CITIES_KEY = 'weather-app-recent-cities'
const MAX_RECENT_CITIES = 5

/**
 * "Tema preferido"    
 * @param {string} theme - 'light' or 'dark'
 */
export function saveTheme(theme) {
    try {
        localStorage.setItem(THEME_KEY, theme)
    } catch (error) {
        console.error('Error saving theme:', error)
    }
}

/**
 * return tema preferido
 * @returns {string|null} 
 */
export function loadTheme() {
    try {
        return localStorage.getItem(THEME_KEY)
    } catch (error) {
        console.error('Error loading theme:', error)
        return null
    }
}

/**
 *  cidades recentes 
 * @param {Array} cities 
 */
export function saveRecentCities(cities) {
    try {
        const limited = cities.slice(0, MAX_RECENT_CITIES)
        localStorage.setItem(RECENT_CITIES_KEY, JSON.stringify(limited))
    } catch (error) {
        console.error('Error saving recent cities:', error)
    }
}

/**
 * return cidades recentes
 * @returns {Array} 
 */
export function loadRecentCities() {
    try {
        const stored = localStorage.getItem(RECENT_CITIES_KEY)
        return stored ? JSON.parse(stored) : []
    } catch (error) {
        console.error('Error loading recent cities:', error)
        return []
    }
}

/**
 * adiciona cidade a lista de cidades recentes
 * @param {Object} city 
 * @returns {Array} 
 */
export function addRecentCity(city) {
    const recent = loadRecentCities()

    // Remove if already exists
    const filtered = recent.filter(c =>
        !(c.latitude === city.latitude && c.longitude === city.longitude)
    )

    // add
    const updated = [city, ...filtered].slice(0, MAX_RECENT_CITIES)

    saveRecentCities(updated)
    return updated
}

/**
 * remove cidade da lista de recentes
 * @param {Object} city 
 * @returns {Array} 
 */
export function removeRecentCity(city) {
    const recent = loadRecentCities()
    const filtered = recent.filter(c =>
        !(c.latitude === city.latitude && c.longitude === city.longitude)
    )

    saveRecentCities(filtered)
    return filtered
}

/**
 * clear all cidades
 */
export function clearRecentCities() {
    try {
        localStorage.removeItem(RECENT_CITIES_KEY)
    } catch (error) {
        console.error('Error clearing recent cities:', error)
    }
}
