<script setup>
import { computed } from 'vue'
import { useTransactionStore } from '../stores/transactions'
import { useAuthStore } from '../stores/auth'
import { rupiah, dateTime } from '../utils/format'
const tx = useTransactionStore(); const auth = useAuthStore()
const rows = computed(() => (auth.role === 'pemilik' ? tx.list : tx.todayList))
</script>
<template>
  <h1>{{ auth.role === 'pemilik' ? 'Riwayat transaksi' : 'Transaksi hari ini' }}</h1>
  <p v-if="!rows.length" class="muted">Belum ada transaksi.</p>
  <table v-else class="table"><thead><tr><th>Waktu</th><th>Pesanan</th><th>Bayar</th><th>Total</th></tr></thead>
    <tbody><tr v-for="t in rows" :key="t.id"><td>{{ dateTime(t.date) }}</td><td>{{ t.items.map((i) => `${i.name} x${i.qty}`).join(', ') }}</td><td>{{ t.payment }}</td><td>{{ rupiah(t.total) }}</td></tr></tbody></table>
</template>
