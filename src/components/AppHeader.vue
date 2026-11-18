<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
const router = useRouter()
const links = computed(() => router.getRoutes().filter((r) => r.meta?.roles?.includes(auth.role) && r.meta.title))
function logout() { auth.logout(); router.push({ name: 'login' }) }
</script>
<template>
  <header class="bar">
    <strong class="brand">Big Noski</strong>
    <nav><RouterLink v-for="l in links" :key="l.name" :to="{ name: l.name }">{{ l.meta.title }}</RouterLink></nav>
    <div class="who"><span>{{ auth.user.name }} ({{ auth.role }})</span><button class="btn ghost" @click="logout">Keluar</button></div>
  </header>
</template>
