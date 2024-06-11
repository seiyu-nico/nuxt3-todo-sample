<script setup lang="ts">

type RouteParams = {
  id: string;
};
const route = useRoute();
const params = route.params as RouteParams;
const id = params.id;

</script>
<template>
  <div>
    <h1>Todo詳細</h1>
    <p>id: {{ id }}</p>
  </div>
</template>
