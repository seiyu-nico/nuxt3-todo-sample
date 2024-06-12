import { type Ref, ref, readonly } from "vue";
import { Todo } from "~/entities/todo";
import { type Todo as TTodo } from "~/types/todo";

export const useTodos = () => new TodosStore();

class TodosStore {
  private _state: Ref<TTodo[]> = useState<TTodo[]>(() => ref([]));
  private _loading: Ref<boolean> = useState<boolean>(() => ref(false));
  private _error: Ref<string | null> = useState<string | null>(() => ref(null));

  constructor() {}

  async fetchTodos() {
    this._loading.value = true;
    this._error.value = null;
    try {
      const { data, error: fetchError } = await useFetch<TTodo[]>("/api/todos");
      if (fetchError.value) {
        throw new Error(fetchError.value.message);
      }

      if (data.value === null) {
        this._state.value = [];
      } else {
        this._state.value = data.value.map((todoData) => new Todo(todoData));
      }
    } catch (err) {
      this._error.value = (err as Error).message;
    } finally {
      this._loading.value = false;
    }
  }

  get state() {
    return this._state;
  }

  get loading() {
    return this._loading;
  }

  get error() {
    return this._error;
  }
}
