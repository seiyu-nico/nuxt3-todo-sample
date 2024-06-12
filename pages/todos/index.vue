<script setup lang="ts">
const todosStore = useTodos();
const todos = todosStore.states;
const loading = todosStore.loading;
const error = todosStore.error;
onMounted(async () => {
  await todosStore.fetchItems();
});
</script>
<template>
  <div>
    <h1>Todo一覧</h1>
    <nuxt-link to="/todos/create">新規作成</nuxt-link>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <nuxt-link :to="`/todos/${todo.id}`">{{ todo.title }}</nuxt-link>
          {{ todo.toJson()}}
        </li>
      </ul>
    </div>
  </div>
</template>
