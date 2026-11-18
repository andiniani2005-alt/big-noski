import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
const routes = [
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue'), meta: { public: true } },
  { path: '/', redirect: '/kasir' },
  { path: '/dashboard', name: 'dashboard', component: () => import('../views/DashboardView.vue'), meta: { roles: ['pemilik'], title: 'Dashboard' } },
  { path: '/produk', name: 'produk', component: () => import('../views/ProductsView.vue'), meta: { roles: ['pemilik'], title: 'Menu dan Harga' } },
  { path: '/pembelian', name: 'pembelian', component: () => import('../views/PurchasesView.vue'), meta: { roles: ['pemilik'], title: 'Belanja Bahan' } },
  { path: '/kasir', name: 'kasir', component: () => import('../views/CashierView.vue'), meta: { roles: ['pemilik', 'karyawan'], title: 'Kasir' } },
  { path: '/riwayat', name: 'riwayat', component: () => import('../views/HistoryView.vue'), meta: { roles: ['pemilik', 'karyawan'], title: 'Riwayat' } },
  { path: '/:pathMatch(.*)*', redirect: '/kasir' }
]
const router = createRouter({ history: createWebHashHistory(), routes })
router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.public) return auth.isLoggedIn ? { name: 'kasir' } : true
  if (!auth.isLoggedIn) return { name: 'login' }
  if (to.meta.roles && !to.meta.roles.includes(auth.role)) return { name: 'kasir', query: { ditolak: '1' } }
  return true
})
export default router
