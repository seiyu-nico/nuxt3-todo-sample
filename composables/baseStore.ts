import { type Ref, ref, readonly } from 'vue';

interface Identifiable {
  id: number;
}

async function fetch<T>(url: string, opts?: any) {
  return useFetch<T>(url, opts);
}

export abstract class BaseStore<T extends Identifiable, U> {
  protected _loading: Ref<boolean> = ref(false);
  protected _errors: Ref<string[]> = ref([]);
  protected _state: Ref<T | null> = ref(null);
  protected _states: Ref<T[]> = ref([]);

  protected abstract endpoint: string;
  protected abstract createInstance(data: any): T;

  get loading() {
    return readonly(this._loading);
  }

  get errors() {
    return readonly(this._errors);
  }

  get state() {
    return readonly(this._state);
  }

  get states() {
    return readonly(this._states);
  }

  async fetchItems(queries: Map<string, string> = new Map()): Promise<void> {
    this._loading.value = true;
    this._errors.value = [];
    try {
      const { data, error: fetchError } = await fetch<T[]>(this.endpoint, {
        params: queries,
      });

      if (fetchError.value && fetchError.value.statusCode === 422) {
        // MEMO: fetchError.valueのデータ構造がわからないので実際やってみてから修正
        // throwするかもしれないし、ここで対応するかもしれないし、実際には作ってみて
        // this._errors.value = fetchError.value.message;
        return;
      }
      else if (fetchError.value) {
        throw new Error(fetchError.value.message);
      }

      if (data.value === null) {
        this._states.value = [];
      }
      else {
        this._states.value = data.value.map(this.createInstance);
      }
    }
    catch (err) {
      console.log('err', err);
    }
    finally {
      this._loading.value = false;
    }
  }

  async fetchItem(id: number): Promise<void> {
    this._loading.value = true;
    this._errors.value = [];
    try {
      const { data, error: fetchError } = await fetch<T>(
        `${this.endpoint}/${id}`,
      );
      if (fetchError.value && fetchError.value.statusCode === 422) {
        // MEMO: fetchError.valueのデータ構造がわからないので実際やってみてから修正
        // throwするかもしれないし、ここで対応するかもしれないし、実際には作ってみて
        // this._errors.value = fetchError.value.message;
        return;
      }
      else if (fetchError.value) {
        throw new Error(fetchError.value.message);
      }

      if (data.value === null) {
        this._state.value = null;
        throw createError({ statusCode: 404, message: 'Page Not Found' });
      }
      else {
        this._state.value = this.createInstance(data.value);
      }
    }
    catch (err) {
      console.log('err', err);
    }
    finally {
      this._loading.value = false;
    }
  }

  async create(item: U): Promise<void> {
    this._loading.value = true;
    this._errors.value = [];
    try {
      const { data, error: createError } = await fetch<T>(this.endpoint, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (createError.value && createError.value.statusCode === 422) {
        // MEMO: createError.valueのデータ構造がわからないので実際やってみてから修正
        // throwするかもしれないし、ここで対応するかもしれないし、実際には作ってみて
        // this._errors.value = fetchError.value.message;
        return;
      }
      else if (createError.value) {
        throw new Error(createError.value.message);
      }
      if (data.value === null) {
        this._state.value = null;
      }
      else {
        this._state.value = this.createInstance(data.value);
      }
    }
    catch (err) {
      console.log('err', err);
    }
    finally {
      this._loading.value = false;
    }
  }

  async update(item: T): Promise<void> {
    this._loading.value = true;
    this._errors.value = [];
    try {
      const { data, error: updateError } = await fetch<T>(
        `${this.endpoint}/${item.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(item),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (updateError.value && updateError.value.statusCode === 422) {
        // MEMO: updateError.valueのデータ構造がわからないので実際やってみてから修正
        // throwするかもしれないし、ここで対応するかもしれないし、実際には作ってみて
        // this._errors.value = fetchError.value.message;
        return;
      }
      else if (updateError.value) {
        throw new Error(updateError.value.message);
      }

      if (data.value === null) {
        this._state.value = null;
      }
      else {
        this._state.value = this.createInstance(data.value);
      }
    }
    catch (err) {
      console.log('err', err);
      throw err;
    }
    finally {
      this._loading.value = false;
    }
  }
}
