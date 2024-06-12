<script setup lang="ts">
import { NewTodo } from "~/entities/todo";
import { TodoStatusOptions } from "~/types/todo";
const TodoStore = useTodo();
const todo = TodoStore.state;
const loading = TodoStore.loading;
const error = TodoStore.error;

const localTodo = ref<NewTodo>(new NewTodo({
  title: "",
  status: "not_started"
}));

const create = async () => {
  if (localTodo.value === null) {
    throw new Error("Todo not found");
  }
  await TodoStore.createTodo(localTodo.value);
};

</script>
<template>
  <div>
    <h1>Todo編集</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="localTodo !== null">
        <div>
          <label for="title">Title:</label>
          <input
            id="title"
            :value="localTodo.title"
            type="text"
            @input="(event) => {
              if (localTodo !== null) {
                localTodo = localTodo.copyWith({ title: (event.target as HTMLInputElement).value });
            }
            }"
          />
        </div>
        <div>
          <label for="status">Status:</label>
          <select id="status" v-model="localTodo.status">
            <option v-for="status in TodoStatusOptions" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
        </div>
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
