import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'productsInformation',
    component: () => import('@/view/pages/Dashboard.vue'),
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('@/view/pages/ProductInfo.vue'),
  },
  {
    path: '/lab-test',
    name: 'labTest',
    component: () => import('@/view/pages/LabTest.vue'),
  },
  {
    path: '/appointment',
    name: 'appointment',
    component: () => import('@/view/pages/Appointment.vue'),
  },
  {
    path: '/medicine-order',
    name: 'medicineOrder',
    component: () => import('@/view/pages/MedicineOrder.vue'),
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('@/view/pages/Message.vue'),
  },
  {
    path: '/payment',
    name: 'payment',
    component: () => import('@/view/pages/Payment.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/view/pages/Settings.vue'),
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('@/view/pages/Help.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: () => import('@/view/pages/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
