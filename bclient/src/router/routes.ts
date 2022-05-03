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
          path: 'erc_token',
          name: 'erc_token',
          component: () => import('pages/Ljm.vue') 
        },
        {
          path: 'ico',
          name: 'ico',
          component: () => import('pages/Ico.vue') 
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
