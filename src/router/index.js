import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityView from '../views/CityView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                title: 'api clima vue'
            }
        },
        {
            path: '/city/:lat/:lon',
            name: 'city',
            component: CityView,
            props: route => ({
                lat: parseFloat(route.params.lat),
                lon: parseFloat(route.params.lon),
                cityName: route.query.name || 'Cidade'
            }),
            meta: {
                title: 'api clima vue'
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Weather App'
    next()
})

export default router
