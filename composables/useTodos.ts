import { type Ref, ref, readonly } from "vue";
import { type Todo as TTodo } from "~/types/todo";
import { Todo, NewTodo } from "~/entities/todo";

export const useTodos = () => new TodosStore();

class TodosStore {
  private _states: Ref<TTodo[]> = useState<TTodo[]>(() => ref([]));
  private _state: Ref<Todo | null> = useState<Todo | null>(() => ref(null));
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
        this._states.value = [];
      } else {
        this._states.value = data.value.map((todoData) => new Todo(todoData));
      }
    } catch (err) {
      this._error.value = (err as Error).message;
    } finally {
      this._loading.value = false;
    }
  }

  async fetchTodo(id: Number) {
    this._loading.value = true;
    this._error.value = null;
    try {
      const { data, error: fetchError } = await useFetch<Todo>(
        `/api/todos/${id}`,
      );
      if (fetchError.value) {
        throw new Error(fetchError.value.message);
      }

      if (data.value === null) {
        this._state.value = null;
        throw createError({ statusCode: 404, message: "Page Not Found" });
      } else {
        this._state.value = new Todo(data.value);
      }
    } catch (err) {
      this._error.value = (err as Error).message;
    } finally {
      this._loading.value = false;
    }
  }
  async updateTodo(todo: Todo) {
    this._loading.value = true;
    this._error.value = null;
    try {
      const { data, error: updateError } = await useFetch<Todo>(
        `/api/todos/${todo.id}`,
        {
          method: "PUT",
          body: todo.toJson(),
        },
      );
      if (updateError.value) {
        throw new Error(updateError.value.message);
      }
      if (data.value === null) {
        this._state.value = null;
        throw createError({ statusCode: 404, message: "Page Not Found" });
      } else {
        this._state.value = new Todo(data.value);
      }
    } catch (err) {
      this._error.value = (err as Error).message;
    } finally {
      this._loading.value = false;
    }
  }

  async createTodo(todo: NewTodo) {
    this._loading.value = true;
    this._error.value = null;
    try {
      const { data, error: updateError } = await useFetch<Todo>(`/api/todos`, {
        method: "POST",
        body: todo.toJson(),
      });
      if (updateError.value) {
        throw new Error(updateError.value.message);
      }
      if (data.value === null) {
        this._state.value = null;
        throw createError({ statusCode: 404, message: "Page Not Found" });
      } else {
        this._state.value = new Todo(data.value);
      }
    } catch (err) {
      this._error.value = (err as Error).message;
    } finally {
      this._loading.value = false;
    }
  }

  get states() {
    return this._states;
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
