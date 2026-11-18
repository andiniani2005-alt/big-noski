<script setup>
import { ref } from 'vue'
import { usePurchaseStore } from '../stores/purchases'
import { rupiah } from '../utils/format'
const store = usePurchaseStore()
const today = new Date().toISOString().slice(0, 10)
const form = ref({ date: today, ingredientId: '', qty: '', price: '' }); const error = ref('')
function save() {
  const res = store.add(form.value)
  if (!res.ok) { error.value = res.message; return }
  error.value = ''; form.value = { date: today, ingredientId: '', qty: '', price: '' }
}
const unit = (id) => store.ingredients.find((i) => i.id === id)?.unit
</script>
<template>
  <h1>Belanja bahan harian</h1>
  <section class="panel form-row">
    <label>Tanggal<input v-model="form.date" type="date" /></label>
    <label>Bahan<select v-model="form.ingredientId"><option value="">Pilih bahan</option><option v-for="i in store.ingredients" :key="i.id" :value="i.id">{{ i.name }}</option></select></label>
    <label>Jumlah<input v-model="form.qty" type="number" min="0" /></label>
    <label>Total harga beli (Rp)<input v-model="form.price" type="number" min="0" /></label>
    <button class="btn" @click="save">Catat belanja</button>
    <p v-if="error" class="error" role="alert">{{ error }}</p>
  </section>
  <table class="table"><thead><tr><th>Tanggal</th><th>Bahan</th><th>Jumlah</th><th>Harga beli</th><th>Harga per satuan</th><th></th></tr></thead>
    <tbody><tr v-for="p in store.list" :key="p.id"><td>{{ p.date }}</td><td>{{ p.ingredient }}</td><td>{{ p.qty }} {{ unit(p.ingredientId) }}</td>
      <td>{{ rupiah(p.price) }}</td><td>{{ rupiah(p.price / p.qty) }}</td><td><button class="btn ghost danger" @click="store.remove(p.id)">Hapus</button></td></tr></tbody></table>
</template>
