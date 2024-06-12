<script setup lang="ts">

type RouteParams = {
  id: number
}
const route = useRoute()
const params = route.params as RouteParams
const id = params.id
const TodoStore = useTodos()
const todo = TodoStore.state
const loading = TodoStore.loading
const errors = TodoStore.errors
onMounted(async () => {
  await TodoStore.fetchItem(id)
})
</script>
<template>
  <div>
    <h1>Todo詳細</h1>
    <nuxt-link to="/todos">一覧に戻る</nuxt-link>
    <div v-if="loading">Loading...</div>
    <div v-else-if="errors">{{ errors }}</div>
    <div v-else>
      <p>id: {{ id }}</p>
      <p>title: {{ todo?.title }}</p>
      <p>status: {{ todo?.status }}</p>
      <nuxt-link :to="`/todos/${id}/edit`">編集</nuxt-link>
    </div>
  </div>
</template>
