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
          path:"dynamic_contract_create",
          name:"dynamic_contract_create",
          component:()=>import("pages/DynamicContractCreate.vue")
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
