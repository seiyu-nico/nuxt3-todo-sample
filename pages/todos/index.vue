<script setup lang="ts">
const todosStore = useTodos();
await todosStore.fetchItems();
const todos = todosStore.states;
const loading = todosStore.loading;
const errors = todosStore.errors;

useSeoMeta({
  title: 'Todo一覧 - サイト名',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
});
</script>
<template>
  <div>
    <h1>Todo一覧</h1>
    <nuxt-link to="/todos/create">新規作成</nuxt-link>
    <div v-if="loading">Loading...</div>
    <div v-else-if="errors.length">{{ errors }}</div>
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
