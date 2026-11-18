import { defineStore } from 'pinia'
import { computed } from 'vue'
import { usePersistent, nextId } from '../utils/storage'
import { isToday } from '../utils/format'
import seed from '../seed/purchases.json'
import ingredients from '../seed/ingredients.json'
export const usePurchaseStore = defineStore('purchases', () => {
  const list = usePersistent('purchases', seed)
  function add({ date, ingredientId, qty, price }) {
    const ing = ingredients.find((i) => i.id === Number(ingredientId))
    if (!ing) return { ok: false, message: 'Pilih bahan terlebih dahulu.' }
    if (!(Number(qty) > 0) || !(Number(price) > 0)) return { ok: false, message: 'Jumlah dan harga beli harus lebih dari nol.' }
    list.value.unshift({ id: nextId(list.value), date, ingredientId: ing.id, ingredient: ing.name, qty: Number(qty), price: Number(price) })
    return { ok: true }
  }
  const remove = (id) => { list.value = list.value.filter((p) => p.id !== id) }
  const todayCost = computed(() => list.value.filter((p) => isToday(p.date)).reduce((s, p) => s + p.price, 0))
  return { list, ingredients, add, remove, todayCost }
})
