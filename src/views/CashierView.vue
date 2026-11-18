<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import CartItem from '../components/CartItem.vue'
import { useProductStore } from '../stores/products'
import { useTransactionStore } from '../stores/transactions'
import { useAuthStore } from '../stores/auth'
import { rupiah } from '../utils/format'
const products = useProductStore(); const tx = useTransactionStore(); const auth = useAuthStore()
const route = useRoute()
const payment = ref(''); const msg = ref(''); const ok = ref(false); const search = ref('')
function pay() {
  const res = tx.checkout(payment.value, auth.user.name)
  ok.value = res.ok; msg.value = res.ok ? 'Transaksi tersimpan.' : res.message
  if (res.ok) payment.value = ''
}
const filtered = () => products.items.filter((p) => p.name.toLowerCase().includes(search.value.toLowerCase()))
</script>
<template>
  <p v-if="route.query.ditolak" class="error" role="alert">Akses ditolak: halaman itu hanya untuk pemilik.</p>
  <div class="split">
    <section><h1>Kasir</h1>
      <input v-model="search" class="search" placeholder="Cari menu" />
      <div class="grid"><ProductCard v-for="p in filtered()" :key="p.id" :product="p" @select="tx.addToCart" /></div>
    </section>
    <aside class="panel cart"><h2>Pesanan</h2>
      <p v-if="!tx.cart.length" class="muted">Pilih menu di sebelah kiri untuk mulai mencatat.</p>
      <ul><CartItem v-for="i in tx.cart" :key="i.productId" :item="i" @change="tx.changeQty" /></ul>
      <p class="total">Total <strong>{{ rupiah(tx.cartTotal) }}</strong></p>
      <div class="pay">
        <label><input v-model="payment" type="radio" value="Tunai" /> Tunai</label>
        <label><input v-model="payment" type="radio" value="Transfer" /> Transfer</label>
      </div>
      <button class="btn" @click="pay">Simpan transaksi</button>
      <p v-if="msg" :class="ok ? 'okmsg' : 'error'" role="status">{{ msg }}</p>
    </aside>
  </div>
</template>
