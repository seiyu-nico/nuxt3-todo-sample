<script setup lang="ts">

type RouteParams = {
  id: number;
};
const route = useRoute();
const params = route.params as RouteParams;
const id = params.id;
const TodoStore = useTodos();
await TodoStore.fetchItem(id);
const todo = TodoStore.state;
const loading = TodoStore.loading;
const errors = TodoStore.errors;

if (todo.value === null) {
  throw new Error('Todo not found');
}

useSeoMeta({
  title: `${todo.value.title} - サイト名`,
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
});
</script>
<template>
  <div>
    <h1>Todo詳細</h1>
    <nuxt-link to="/todos">一覧に戻る</nuxt-link>
    <div v-if="loading">Loading...</div>
    <div v-else-if="errors.length">{{ errors }}</div>
    <div v-else>
      <p>id: {{ id }}</p>
      <p>title: {{ todo?.title }}</p>
      <p>status: {{ $t(`todos.status.${todo?.status}`, ) }}</p>
      <nuxt-link :to="`/todos/${id}/edit`">編集</nuxt-link>
    </div>
  </div>
</template>
