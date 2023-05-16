import { createRouter, createWebHistory } from "vue-router";

import Calendar from '../views/Calendar.vue'


const routes = [
    {
        name: 'Calendar',
        path: '/',
        component: Calendar,
    },

    
];
const router = Router();
export default router;
function Router() {
    const router = new createRouter({
        history: createWebHistory(),
        routes,
    });
    return router;
}

