export const rupiah = (n) => 'Rp' + Number(n || 0).toLocaleString('id-ID')
export const isToday = (iso) => String(iso).slice(0, 10) === new Date().toISOString().slice(0, 10)
export const dateTime = (iso) => new Date(iso).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
