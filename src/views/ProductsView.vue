<script setup>
import { ref } from 'vue'
import { useProductStore } from '../stores/products'
import { rupiah } from '../utils/format'
const store = useProductStore()
const blank = () => ({ name: '', category: 'Jus', price: '' })
const form = ref(blank()); const editId = ref(null); const error = ref('')
function save() {
  const res = editId.value ? store.update(editId.value, form.value) : store.add(form.value)
  if (!res.ok) { error.value = res.message; return }
  error.value = ''; form.value = blank(); editId.value = null
}
function edit(p) { editId.value = p.id; form.value = { name: p.name, category: p.category, price: p.price } }
function cancel() { editId.value = null; form.value = blank(); error.value = '' }
function del(p) { if (confirm(`Hapus ${p.name}?`)) store.remove(p.id) }
</script>
<template>
  <h1>Menu dan harga</h1>
  <section class="panel form-row">
    <label>Nama<input v-model="form.name" /></label>
    <label>Kategori<input v-model="form.category" /></label>
    <label>Harga (Rp)<input v-model="form.price" type="number" min="0" /></label>
    <button class="btn" @click="save">{{ editId ? 'Simpan perubahan' : 'Tambah menu' }}</button>
    <button v-if="editId" class="btn ghost" @click="cancel">Batal</button>
    <p v-if="error" class="error" role="alert">{{ error }}</p>
  </section>
  <table class="table"><thead><tr><th>Nama</th><th>Kategori</th><th>Harga</th><th></th></tr></thead>
    <tbody><tr v-for="p in store.items" :key="p.id"><td>{{ p.name }}</td><td>{{ p.category }}</td><td>{{ rupiah(p.price) }}</td>
      <td class="actions"><button class="btn ghost" @click="edit(p)">Ubah</button><button class="btn ghost danger" @click="del(p)">Hapus</button></td></tr></tbody></table>
</template>
