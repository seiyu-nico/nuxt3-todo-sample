      <script setup lang="ts">
// import { defineProps, defineEmits } from "vue";
import { TodoStatus } from "~/types/todo";

const props = defineProps<{
  todo: { title: string; status: TodoStatus };
  statusOptions: TodoStatus[];
}>();

const emit = defineEmits<{
  (e: "update:todo", todo: { title: string; status: TodoStatus }): void;
}>();

const updateTitle = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit("update:todo", { ...props.todo, title: input.value });
};

const updateStatus = (event: Event) => {
  const select = event.target as HTMLSelectElement;
  emit("update:todo", { ...props.todo, status: select.value as TodoStatus });
};

</script>
<template>
  <div>
    <div>
      <label for="title">Title:</label>
      <input id="title" :value="todo.title" type="text" @input="updateTitle" />
    </div>
    <div>
      <label for="status">Status:</label>
      <select id="status" :value="todo.status" @change="updateStatus">
        <option v-for="status in statusOptions" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
    </div>
  </div>
</template>

