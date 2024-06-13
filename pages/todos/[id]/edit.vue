<script setup lang="ts">
import { Todo } from '~/entities/todo';
import { type Todo as TTodo, TodoStatusOptions } from '~/types/todo';
type RouteParams = {
  id: number;
};
const route = useRoute();
const params = route.params as RouteParams;
const id = params.id;
const TodoStore = useTodos();
await TodoStore.fetchItem(id);
const todo = TodoStore.state;
const localTodo = ref<Todo | null>(null);
todo.value && (localTodo.value = new Todo(todo.value));
const loading = TodoStore.loading;
const errors = TodoStore.errors;

const update = async () => {
  if (localTodo.value === null) {
    throw new Error('Todo not found');
  }
  try {
    await TodoStore.update(localTodo.value);
    // 詳細ページに遷移
    await useRouter().push(`/todos/${id}`);
  }
  catch (e) {
    console.error(e);
  }
};

if (todo.value === null) {
  throw new Error('Todo not found');
}

const updateLocalTodo = (todo: Omit<TTodo, 'id'>) => {
  localTodo.value = new Todo({ ...todo, id: id });
};
useSeoMeta({
  title: `${todo.value.title} - 編集 - サイト名`,
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
});
</script>
<template>
  <div>
    <h1>Todo編集</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="errors.length">{{ errors }}</div>
    <div v-else>
      <div v-if="localTodo !== null">
        <p>id: {{ id }}</p>
        <organisms-todo-form
          :todo="localTodo"
          :status-options="TodoStatusOptions"
          @update:todo="updateLocalTodo"
        />
        <div>
          <button class="margin" @click="update">更新</button>
          <nuxt-link :to="`/todos/${id}`">詳細に戻る</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.margin {
  margin: 10px;
}
</style>
