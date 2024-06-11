import { type Ref, ref, reactive } from "vue";
import { Todo } from "~/entities/todo";
import { type Todo as TTodo, type TodoStatus } from "~/types/todo";
export const useTodos = () => {
  const todos = useState<TTodo[]>(() => []);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchTodos = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data, error: fetchError } = await useFetch<TTodo[]>("/api/todos");
      console.log("data:", data);
      console.log("fetchError:", fetchError);

      if (fetchError.value) {
        throw new Error(fetchError.value.message);
      }

      if (data.value === null) {
        console.log("data.value is null");
        todos.value = [];
      } else {
        console.log("こっちきた");
        todos.value = data.value.map((todoData) => new Todo(todoData));
      }
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  return {
    todos: readonly(todos),
    loading,
    error,
    fetchTodos,
  };
};
