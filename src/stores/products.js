import { defineStore } from 'pinia'
import { usePersistent, nextId } from '../utils/storage'
import seed from '../seed/products.json'
export const useProductStore = defineStore('products', () => {
  const items = usePersistent('products', seed)
  function validate(p) {
    if (!p.name?.trim()) return 'Nama produk wajib diisi.'
    if (!(Number(p.price) > 0)) return 'Harga harus lebih dari nol.'
    return ''
  }
  function add(p) {
    const err = validate(p); if (err) return { ok: false, message: err }
    items.value.push({ id: nextId(items.value), name: p.name.trim(), category: p.category || 'Lainnya', price: Number(p.price) })
    return { ok: true }
  }
  function update(id, p) {
    const err = validate(p); if (err) return { ok: false, message: err }
    const i = items.value.findIndex((x) => x.id === id)
    items.value[i] = { ...items.value[i], name: p.name.trim(), category: p.category, price: Number(p.price) }
    return { ok: true }
  }
  const remove = (id) => { items.value = items.value.filter((x) => x.id !== id) }
  return { items, add, update, remove }
})
