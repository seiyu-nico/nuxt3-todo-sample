import { todos } from './data';
import { type NewTodo } from '~/types/todo';

export default defineEventHandler(async (event) => {
  const body = await readBody<NewTodo>(event);
  const todoLength = todos.length;

  const todo = {
    id: todoLength + 1,
    ...body,
  };

  console.log('todo', todo);

  todos.push(todo);

  return todo;
});
