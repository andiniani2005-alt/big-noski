import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { usePersistent, nextId } from '../utils/storage'
import { isToday } from '../utils/format'
import seed from '../seed/transactions.json'
export const useTransactionStore = defineStore('transactions', () => {
  const list = usePersistent('transactions', seed)
  const cart = ref([])
  const cartTotal = computed(() => cart.value.reduce((s, i) => s + i.price * i.qty, 0))
  function addToCart(p) {
    const row = cart.value.find((i) => i.productId === p.id)
    if (row) row.qty++
    else cart.value.push({ productId: p.id, name: p.name, price: p.price, qty: 1 })
  }
  function changeQty(productId, delta) {
    const row = cart.value.find((i) => i.productId === productId)
    if (!row) return
    row.qty += delta
    if (row.qty <= 0) cart.value = cart.value.filter((i) => i.productId !== productId)
  }
  function checkout(payment, cashier) {
    if (!cart.value.length) return { ok: false, message: 'Keranjang masih kosong.' }
    if (!['Tunai', 'Transfer'].includes(payment)) return { ok: false, message: 'Pilih metode pembayaran.' }
    list.value.unshift({ id: nextId(list.value), date: new Date().toISOString(), cashier, payment, total: cartTotal.value, items: cart.value.map((i) => ({ ...i })) })
    cart.value = []
    return { ok: true }
  }
  const todayList = computed(() => list.value.filter((t) => isToday(t.date)))
  return { list, cart, cartTotal, todayList, addToCart, changeQty, checkout }
})
