<script setup lang="ts">
import { NewTodo } from '~/entities/todo';
import { type NewTodo as TNewTodo, TodoStatusOptions } from '~/types/todo';
const TodoStore = useTodos();
const loading = TodoStore.loading;
const errors = TodoStore.errors;

const localTodo = ref<NewTodo>(new NewTodo({
  title: '',
  status: TodoStatusOptions[0],
}));

const create = async () => {
  if (localTodo.value === null) {
    throw new Error('Todo not found');
  }
  try {
    await TodoStore.create(localTodo.value);
    await useRouter().push(`/todos`);
  }
  catch (e) {
    console.error(e);
  }
};

const updateLocalTodo = (todo: TNewTodo) => {
  localTodo.value = new NewTodo(todo);
};
useSeoMeta({
  title: 'Todo新規作成',
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
        <organisms-todo-form :todo="localTodo" :status-options="TodoStatusOptions" @update:todo="updateLocalTodo" />
        <div>
          <button class="margin" @click="create">更新</button>
          <nuxt-link :to="`/todos`">詳細に戻る</nuxt-link>
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
