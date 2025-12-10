/* api open meteo */

const BASE_URL = 'https://api.open-meteo.com/v1'

/**
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} 
 */
export async function getCurrentWeather(lat, lon) {
    try {
        const params = new URLSearchParams({
            latitude: lat,
            longitude: lon,
            current: [
                'temperature_2m',
                'apparent_temperature',
                'relative_humidity_2m',
                'precipitation',
                'weather_code',
                'cloud_cover',
                'wind_speed_10m',
                'wind_direction_10m'
            ].join(','),
            timezone: 'auto'
        })


        const response = await fetch(`${BASE_URL}/forecast?${params}`)

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`)
        }

        const data = await response.json()
        return transformCurrentWeather(data)
    } catch (error) {
        console.error('Error fetching current weather:', error)
        throw error
    }
}

/**
 * 24 hrs
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} 
 */
export async function getHourlyForecast(lat, lon) {
    try {
        const params = new URLSearchParams({
            latitude: lat,
            longitude: lon,
            hourly: [
                'temperature_2m',
                'relative_humidity_2m',
                'precipitation_probability',
                'precipitation',
                'weather_code',
                'wind_speed_10m'
            ].join(','),
            forecast_days: 2,
            timezone: 'auto'
        })

        const response = await fetch(`${BASE_URL}/forecast?${params}`)

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`)
        }

        const data = await response.json()
        return transformHourlyForecast(data)
    } catch (error) {
        console.error('Error fetching hourly forecast:', error)
        throw error
    }
}

/**
 * 7 dias
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} 
 */
export async function getDailyForecast(lat, lon) {
    try {
        const params = new URLSearchParams({
            latitude: lat,
            longitude: lon,
            daily: [
                'weather_code',
                'temperature_2m_max',
                'temperature_2m_min',
                'precipitation_sum',
                'precipitation_probability_max',
                'wind_speed_10m_max',
                'uv_index_max',
                'sunrise',
                'sunset'
            ].join(','),
            forecast_days: 7,
            past_days: 0,
            timezone: 'auto'
        })


        const response = await fetch(`${BASE_URL}/forecast?${params}`)

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`)
        }

        const data = await response.json()
        return transformDailyForecast(data)
    } catch (error) {
        console.error('Error fetching daily forecast:', error)
        throw error
    }
}

/**
 * 
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} 
 */
export async function getCompleteWeather(lat, lon) {
    try {
        const [current, hourly, daily] = await Promise.all([
            getCurrentWeather(lat, lon),
            getHourlyForecast(lat, lon),
            getDailyForecast(lat, lon)
        ])

        return {
            current,
            hourly,
            daily
        }
    } catch (error) {
        console.error('Error fetching complete weather:', error)
        throw error
    }
}

function transformCurrentWeather(data) {
    const current = data.current

    return {
        temperature: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        humidity: current.relative_humidity_2m,
        precipitation: current.precipitation,
        weatherCode: current.weather_code,
        cloudCover: current.cloud_cover,
        windSpeed: Math.round(current.wind_speed_10m),
        windDirection: current.wind_direction_10m,
        time: current.time
    }
}

function transformHourlyForecast(data) {
    const hourly = data.hourly
    const now = new Date()
    const currentHour = now.getHours()

    // próximas 24 hrs
    const hours = []
    for (let i = 0; i < 24; i++) {
        hours.push({
            time: hourly.time[i],
            temperature: Math.round(hourly.temperature_2m[i]),
            humidity: hourly.relative_humidity_2m[i],
            precipitationProbability: hourly.precipitation_probability[i] || 0,
            precipitation: hourly.precipitation[i],
            weatherCode: hourly.weather_code[i],
            windSpeed: Math.round(hourly.wind_speed_10m[i])
        })
    }

    return hours
}

function transformDailyForecast(data) {
    const daily = data.daily
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const allDays = daily.time.map((time, index) => ({
        date: time,
        weatherCode: daily.weather_code[index],
        tempMax: Math.round(daily.temperature_2m_max[index]),
        tempMin: Math.round(daily.temperature_2m_min[index]),
        precipitation: daily.precipitation_sum[index],
        precipitationProbability: daily.precipitation_probability_max[index] || 0,
        windSpeed: Math.round(daily.wind_speed_10m_max[index]),
        uvIndex: daily.uv_index_max[index],
        sunrise: daily.sunrise[index],
        sunset: daily.sunset[index]
    }))

    return allDays.filter(day => {
        const dayDate = new Date(day.date)
        dayDate.setHours(0, 0, 0, 0)
        return dayDate >= today
    }).slice(0, 7)
}
