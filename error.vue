<script setup>
const error = useError();
</script>
<template>
  <div v-if="error.statusCode === 404">
    <h1>エラーページ</h1>
    <p>{{ error.message }}</p>
  </div>
</template>
