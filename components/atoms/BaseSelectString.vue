<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  value: string;
  options: string[];
}>();

const emit = defineEmits<{
  (e: 'update:value', value: string): void;
}>();

const onChange = (event: Event) => {
  const select = event.target as HTMLSelectElement;
  emit('update:value', select.value as string);
};
</script>
<template>
  <select :id="id" :value="value" @change="onChange">
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>
