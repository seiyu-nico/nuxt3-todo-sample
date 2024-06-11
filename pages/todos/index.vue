<script setup lang="ts">
const todosState = useTodos();

const { todos, fetchTodos} = todosState;

onMounted(async () => {
  await fetchTodos();
});
</script>
<template>
  <div>
    <h1>Todo一覧</h1>
    <div>
      {{ todos }}
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <nuxt-link :to="`/todos/${todo.id}`">{{ todo.title }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
