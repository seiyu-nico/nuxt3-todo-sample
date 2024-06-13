import { todos } from './data';
import { type Todo as TTodo } from '~/types/todo';

export default defineEventHandler(async (event) => {
  const id: string | undefined = event.context.params?.id;
  const todoId = parseInt(id as string);
  const body = await readBody<Partial<TTodo>>(event);
  const todoIndex = todos.findIndex(todo => todo.id === todoId);

  if (todoIndex === -1) {
    return {
      statusCode: 404,
      body: {
        message: 'Todo not found',
      },
    };
  }

  // 更新内容を反映
  todos[todoIndex] = {
    ...todos[todoIndex],
    ...body,
    id: todoId,
  };

  return todos[todoIndex];
});
