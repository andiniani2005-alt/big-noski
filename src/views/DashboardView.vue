<script setup>
import { computed } from 'vue'
import StatCard from '../components/StatCard.vue'
import { useTransactionStore } from '../stores/transactions'
import { usePurchaseStore } from '../stores/purchases'
import { rupiah } from '../utils/format'
const tx = useTransactionStore(); const pu = usePurchaseStore()
const sales = computed(() => tx.todayList.reduce((s, t) => s + t.total, 0))
const byPay = (m) => tx.todayList.filter((t) => t.payment === m).reduce((s, t) => s + t.total, 0)
const profit = computed(() => sales.value - pu.todayCost)
const best = computed(() => {
  const c = {}
  tx.list.forEach((t) => t.items.forEach((i) => { c[i.name] = (c[i.name] || 0) + i.qty }))
  return Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 5)
})
</script>
<template>
  <h1>Ringkasan hari ini</h1>
  <div class="grid">
    <StatCard label="Penjualan" :value="rupiah(sales)" />
    <StatCard label="Biaya belanja bahan" :value="rupiah(pu.todayCost)" />
    <StatCard label="Estimasi laba" :value="rupiah(profit)" :tone="profit < 0 ? 'neg' : 'pos'" />
    <StatCard label="Tunai" :value="rupiah(byPay('Tunai'))" />
    <StatCard label="Transfer" :value="rupiah(byPay('Transfer'))" />
    <StatCard label="Transaksi" :value="tx.todayList.length" />
  </div>
  <section class="panel"><h2>Menu terlaris</h2>
    <p v-if="!best.length" class="muted">Belum ada transaksi.</p>
    <ol><li v-for="[n, q] in best" :key="n">{{ n }}: {{ q }} terjual</li></ol>
  </section>
</template>
