<script setup lang="ts">
const props = defineProps<{
  id: string
  label: string
}>()
</script>
<template>
  <label :for="id">{{ label }}</label>
</template>
