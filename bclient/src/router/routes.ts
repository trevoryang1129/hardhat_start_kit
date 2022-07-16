import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
        {
          path: '',
          name: 'home',
          component: () => import('pages/Index.vue') 
        },
        {
          path: '',
          name: 'greeter',
          component: () => import('pages/Greeter.vue') 
        },
        {
          path: 'prb_fixed_point',
          name: 'prb_fixed_point',
          component: () => import('pages/PrbFixedPoint.vue') 
        }
      ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
