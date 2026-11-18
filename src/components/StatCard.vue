<script setup>
defineProps({ label: String, value: [String, Number], tone: { type: String, default: '' } })
</script>
<template><div class="stat" :class="tone"><span>{{ label }}</span><strong>{{ value }}</strong></div></template>
