<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore(); const router = useRouter()
const username = ref(''); const password = ref(''); const error = ref('')
function submit() {
  if (!username.value || !password.value) { error.value = 'Username dan kata sandi wajib diisi.'; return }
  const res = auth.login(username.value.trim(), password.value)
  if (!res.ok) { error.value = res.message; return }
  router.push({ name: auth.role === 'pemilik' ? 'dashboard' : 'kasir' })
}
</script>
<template>
  <section class="login panel">
    <h1>Big Noski</h1><p>Masuk untuk mencatat penjualan dan belanja bahan.</p>
    <label>Username<input v-model="username" autocomplete="username" @keyup.enter="submit" /></label>
    <label>Kata sandi<input v-model="password" type="password" autocomplete="current-password" @keyup.enter="submit" /></label>
    <p v-if="error" class="error" role="alert">{{ error }}</p>
    <button class="btn" @click="submit">Masuk</button>
  </section>
</template>
