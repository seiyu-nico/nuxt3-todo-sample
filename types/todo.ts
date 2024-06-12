export const TodoStatus = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
} as const

export type TodoStatus = (typeof TodoStatus)[keyof typeof TodoStatus]

export const TodoStatusOptions: TodoStatus[] = Object.values(TodoStatus)

export type Todo = {
  id: number
  title: string
  status: TodoStatus
}

export type NewTodo = Omit<Todo, 'id'>
