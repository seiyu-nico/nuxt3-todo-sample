import { type Ref, ref, readonly } from "vue";

interface Identifiable {
  id: number;
}

async function fetch<T>(url: string, opts?: any) {
  console.log("opts", opts);
  return useFetch<T>(url, opts);
}

export abstract class BaseStore<T extends Identifiable, U> {
  protected _loading: Ref<boolean> = ref(false);
  protected _error: Ref<string | null> = ref(null);
  protected _state: Ref<T | null> = ref(null);
  protected _states: Ref<T[]> = ref([]);

  protected abstract endpoint: string;
  protected abstract createInstance(data: any): T;

  get loading() {
    return readonly(this._loading);
  }

  get error() {
    return readonly(this._error);
  }

  get state() {
    return readonly(this._state);
  }

  get states() {
    return readonly(this._states);
  }

  async fetchItems(): Promise<void> {
    this._loading.value = true;
    this._error.value = null;
    try {
      const { data, error: fetchError } = await fetch<T[]>(this.endpoint);
      if (fetchError.value) {
        throw new Error(fetchError.value.message);
      }

      if (data.value === null) {
        this._states.value = [];
      } else {
        this._states.value = data.value.map(this.createInstance);
      }
    } catch (err) {
      this._error.value = (err as Error).message;
    } finally {
      this._loading.value = false;
    }
  }

  async fetchItem(id: Number): Promise<void> {
    this._loading.value = true;
    this._error.value = null;
    try {
      const { data, error: fetchError } = await fetch<T>(
        `${this.endpoint}/${id}`,
      );
      if (fetchError.value) {
        throw new Error(fetchError.value.message);
      }

      if (data.value === null) {
        this._state.value = null;
        throw createError({ statusCode: 404, message: "Page Not Found" });
      } else {
        this._state.value = this.createInstance(data.value);
      }
    } catch (err) {
      this._error.value = (err as Error).message;
    } finally {
      this._loading.value = false;
    }
  }

  async create(item: U): Promise<void> {
    this._loading.value = true;
    this._error.value = null;
    try {
      const { data, error: createError } = await fetch<T>(this.endpoint, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (createError.value) {
        throw new Error(createError.value.message);
      }
      if (data.value === null) {
        this._state.value = null;
      } else {
        this._state.value = this.createInstance(data.value);
      }
    } catch (err) {
      this._error.value = (err as Error).message;
    } finally {
      this._loading.value = false;
    }
  }

  async update(item: T): Promise<void> {
    this._loading.value = true;
    this._error.value = null;
    try {
      const { data, error: updateError } = await fetch<T>(
        `${this.endpoint}/${item.id}`,
        {
          method: "PUT",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (updateError.value) {
        throw new Error(updateError.value.message);
      }
      if (data.value === null) {
        this._state.value = null;
        throw createError({ statusCode: 404, message: "Page Not Found" });
      } else {
        this._state.value = this.createInstance(data.value);
      }
    } catch (err) {
      this._error.value = (err as Error).message;
    } finally {
      this._loading.value = false;
    }
  }
}
