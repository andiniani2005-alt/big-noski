import { defineStore } from 'pinia'
import { computed } from 'vue'
import { usePersistent } from '../utils/storage'
import users from '../seed/users.json'
export const useAuthStore = defineStore('auth', () => {
  const user = usePersistent('session', null)
  const isLoggedIn = computed(() => !!user.value)
  const role = computed(() => user.value?.role ?? null)
  function login(username, password) {
    const found = users.find((u) => u.username === username && u.password === password)
    if (!found) return { ok: false, message: 'Username atau kata sandi salah.' }
    user.value = { id: found.id, name: found.name, role: found.role }
    return { ok: true }
  }
  const logout = () => { user.value = null }
  return { user, isLoggedIn, role, login, logout }
})
