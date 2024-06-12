<script setup lang="ts">
import { Todo } from "~/entities/todo";
import { type Todo as TTodo, TodoStatusOptions } from "~/types/todo";
type RouteParams = {
  id: number;
};
const route = useRoute();
const params = route.params as RouteParams;
const id = params.id;
const TodoStore = useTodos();
const todo = TodoStore.state;
const loading = TodoStore.loading;
const error = TodoStore.error;

const localTodo = ref<Todo | null>(null);

const update = async () => {
  if (localTodo.value === null) {
    throw new Error("Todo not found");
  }
  await TodoStore.update(localTodo.value);
  // 詳細ページに遷移
  await useRouter().push(`/todos/${id}`);
};

onMounted(async () => {
  await TodoStore.fetchItem(id);
  if (todo.value === null) {
    throw new Error("Todo not found");
  }
  localTodo.value = new Todo(todo.value);
  console.log(localTodo.value);
});

const updateLocalTodo = (todo: Omit<TTodo, "id">) => {
  localTodo.value = new Todo({...todo, id: id});
};

</script>
<template>
  <div>
    <h1>Todo編集</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="localTodo !== null">
        <p>id: {{ id }}</p>
        <organisms-todo-form :todo="localTodo" :statusOptions="TodoStatusOptions" @update:todo="updateLocalTodo" />
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
