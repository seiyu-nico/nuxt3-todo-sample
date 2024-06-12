import { todos } from './data'

export default defineEventHandler(async (event) => {
  const id: string | undefined = event.context.params?.id
  const todoId = parseInt(id as string)
  const todo = todos.find(todo => todo.id === todoId)
  if (!todo) {
    return new Response(null, { status: 404 })
  }
  return todo
})
