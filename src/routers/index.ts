import { createWebHistory, createRouter } from 'vue-router'

import Login from '@/components/Login.vue'
import RegisterBankTransfer from '@/components/RegisterBankTransfer.vue'
import BankTransfers from '@/components/BankTransfers.vue'
import BankTransferView from '@/views/BankTransferView.vue'
import { getCookie } from '../utils/useful-functions.ts/getCookie'

const routes = [
  { 
    path: '/',
    name: 'Login',
    component: Login 
  },
  { 
    path: '/bank-transfer',
    name: 'RegisterTransfer',
    component: BankTransferView,
    redirect: '/register-bank-transfer',
    children: [
      { 
        path: '/register-bank-transfer',
        name: 'RegisterTransfer',
        component: RegisterBankTransfer
      },
      { 
        path: '/bank-transfers',
        name: 'BankTransfers',
        component: BankTransfers 
      },
    ]
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) =>{
  const cookie = getCookie();
  if (
    to.name !== 'Login' && !cookie
  ) {
    next({ name: 'Login' })
  }
  next()
})




export default router