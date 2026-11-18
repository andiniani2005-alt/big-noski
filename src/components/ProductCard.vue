<script setup>
import { rupiah } from '../utils/format'
defineProps({ product: { type: Object, required: true } })
const emit = defineEmits(['select'])
</script>
<template>
  <button class="product" @click="emit('select', product)">
    <span class="cat">{{ product.category }}</span>
    <strong>{{ product.name }}</strong>
    <span>{{ rupiah(product.price) }}</span>
  </button>
</template>
