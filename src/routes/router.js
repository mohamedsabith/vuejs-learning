import { createRouter, createWebHistory } from 'vue-router';
import SignUp from '../components/signup/SignUp.vue';
import Dashboard from '../components/dashboard/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
