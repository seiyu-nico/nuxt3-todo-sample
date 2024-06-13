import { type Todo as TTodo } from '~/types/todo';
import type { NewTodo } from '~/entities/todo';
import { Todo } from '~/entities/todo';
import { BaseStore } from './baseStore';

export const useTodos = () => new TodosStore();

class TodosStore extends BaseStore<Todo, NewTodo> {
  constructor() {
    super();
  }

  protected endpoint = '/api/todos';

  protected createInstance(data: TTodo): Todo {
    return new Todo(data);
  }
}
