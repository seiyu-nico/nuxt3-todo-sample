<script setup lang="ts">
const props = defineProps<{
  id: string;
  label: string;
  value: string;
  type: string;
}>();

const emit = defineEmits<{
  (e: "update:value", value: string): void;
}>();

const update = (value: string) => {
  emit("update:value", value);
};
</script>
<template>
  <div>
    <AtomsBaseLabel :id="id" :label="label" />
    <AtomsBaseInput :id="id" :label="label" :value="value" :type="type" @update:value="update" />
  </div>
</template>
