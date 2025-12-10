const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1'

/**
 * @param {string} query 
 * @returns {Promise<Array>} 
 */
export async function searchCities(query) {
    if (!query || query.trim().length < 2) {
        return []
    }

    try {
        const params = new URLSearchParams({
            name: query.trim(),
            count: 10,
            language: 'pt',
            format: 'json'
        })

        const response = await fetch(`${GEOCODING_URL}/search?${params}`)

        if (!response.ok) {
            throw new Error(`Geocoding API error: ${response.status}`)
        }

        const data = await response.json()

        if (!data.results) {
            return []
        }

        return data.results.map(city => ({
            id: city.id,
            name: city.name,
            country: city.country,
            countryCode: city.country_code,
            admin1: city.admin1 || '',
            latitude: city.latitude,
            longitude: city.longitude,
            timezone: city.timezone,
            population: city.population || 0,
            displayName: formatCityName(city)
        }))
    } catch (error) {
        console.error('Error searching cities:', error)
        return []
    }
}

/**
 * @param {number} lat 
 * @param {number} lon 
 * @returns {Promise<Object|null>} 
 */
export async function reverseGeocode(lat, lon) {
    try {
        const response = await fetch(
            `${GEOCODING_URL}/search?latitude=${lat}&longitude=${lon}&count=1&language=pt&format=json`
        )

        if (!response.ok) {
            return null
        }

        const data = await response.json()

        if (!data.results || data.results.length === 0) {
            return null
        }

        const city = data.results[0]
        return {
            id: city.id,
            name: city.name,
            country: city.country,
            countryCode: city.country_code,
            admin1: city.admin1 || '',
            latitude: city.latitude,
            longitude: city.longitude,
            timezone: city.timezone,
            displayName: formatCityName(city)
        }
    } catch (error) {
        console.error('Error reverse geocoding:', error)
        return null
    }
}

/**
 * @param {Object} city 
 * @returns {string} 
 */
function formatCityName(city) {
    const parts = [city.name]

    if (city.admin1) {
        parts.push(city.admin1)
    }

    parts.push(city.country)

    return parts.join(', ')
}

/**
 * @param {Function} func 
 * @param {number} wait 
 * @returns {Function} 
 */
export function debounce(func, wait = 300) {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}
