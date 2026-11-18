<script setup>
import { rupiah } from '../utils/format'
defineProps({ item: { type: Object, required: true } })
const emit = defineEmits(['change'])
</script>
<template>
  <li class="cart-row">
    <div><strong>{{ item.name }}</strong><small>{{ rupiah(item.price) }}</small></div>
    <div class="qty">
      <button class="btn ghost" aria-label="Kurangi" @click="emit('change', item.productId, -1)">-</button>
      <span>{{ item.qty }}</span>
      <button class="btn ghost" aria-label="Tambah" @click="emit('change', item.productId, 1)">+</button>
    </div>
    <span>{{ rupiah(item.price * item.qty) }}</span>
  </li>
</template>
