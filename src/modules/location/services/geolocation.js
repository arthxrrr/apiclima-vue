/**
 * Geolocation Service
 * Handles browser geolocation API
 */

/**
 * Get user's current position
 * @returns {Promise<Object>} Position with latitude and longitude
 */
export async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'))
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                })
            },
            (error) => {
                let errorMessage = 'Unable to retrieve your location'

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location permission denied. Please enable location access.'
                        break
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information is unavailable.'
                        break
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out.'
                        break
                }

                reject(new Error(errorMessage))
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
            }
        )
    })
}

/**
 * Check if geolocation is available
 * @returns {boolean} True if geolocation is supported
 */
export function isGeolocationAvailable() {
    return 'geolocation' in navigator
}
