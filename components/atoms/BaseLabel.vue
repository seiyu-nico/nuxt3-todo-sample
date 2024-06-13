<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
}>();
</script>
<template>
  <label :for="id">{{ label }}</label>
</template>
