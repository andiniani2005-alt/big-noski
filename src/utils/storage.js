import { ref, watch } from 'vue'
const PREFIX = 'bignoski:'
export function loadOrSeed(key, seed) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw !== null) return JSON.parse(raw)
  } catch (e) { /* data rusak: pakai seed */ }
  return JSON.parse(JSON.stringify(seed))
}
export function usePersistent(key, seed) {
  const data = ref(loadOrSeed(key, seed))
  localStorage.setItem(PREFIX + key, JSON.stringify(data.value))
  watch(data, (v) => localStorage.setItem(PREFIX + key, JSON.stringify(v)), { deep: true })
  return data
}
export const nextId = (list) => list.reduce((m, x) => Math.max(m, x.id), 0) + 1
