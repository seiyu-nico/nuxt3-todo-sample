<script setup lang="ts">

const props = defineProps<{
  id: string
  label: string
  value: string
  options: string[]
}>()

const emit = defineEmits<{
  (e: 'update:value', value: string): void
}>()

const update = (value: string) => {
  emit('update:value', value)
}
</script>
<template>
  <div>
    <AtomsBaseLabel :id="id" :label="label" />
    <AtomsBaseSelectString :id="id" :label="label" :value="value" :options="options" @update:value="update" />
  </div>
</template>
