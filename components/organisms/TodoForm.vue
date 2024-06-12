      <script setup lang="ts">
import { TodoStatus } from "~/types/todo";

const props = defineProps<{
  todo: { title: string; status: TodoStatus };
  statusOptions: TodoStatus[];
}>();

const emit = defineEmits<{
  (e: "update:todo", todo: { title: string; status: TodoStatus }): void;
}>();

const updateTitle = (title: string) => {
  emit('update:todo', { ...props.todo, title });
};

const updateStatus = (status: string) => {
  emit('update:todo', { ...props.todo, status: status as TodoStatus });
};
</script>
<template>
  <div>
    <div>
      <MoleculesLabelInput
        id="title"
        label="Title:"
        :value="todo.title"
        type="text"
        @update:value="updateTitle"
      />
    </div>
    <div>
      <MoleculesLabelSelectString
        id="status"
        label="Status:"
        :value="todo.status"
        :options="statusOptions"
        @update:value="updateStatus"
      />
    </div>
  </div>
</template>

