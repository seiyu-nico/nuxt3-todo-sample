<script setup lang="ts">
const props = defineProps<{
  id: string
  label: string
  value: string
  type: string
}>()
const emit = defineEmits<{
  (e: 'update:value', value: string): void
}>()
const onInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  emit('update:value', input.value)
}
</script>
<template>
  <input :id="id" :value="value" :type="type" @input="onInput"  >
</template>
