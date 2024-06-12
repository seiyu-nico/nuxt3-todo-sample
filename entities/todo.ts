import {
  type Todo as TTodo,
  type NewTodo as TNewTodo,
  type TodoStatus,
} from '~/types/todo'
import { Entity } from '~/entities/entity'

export class Todo extends Entity<TTodo> implements TTodo {
  readonly id: number
  readonly title: string
  readonly status: TodoStatus

  constructor({ id, title, status }: TTodo) {
    super()
    this.id = id
    this.title = title
    this.status = status
  }
}

export class NewTodo extends Entity<TNewTodo> implements TNewTodo {
  readonly title: string
  readonly status: TodoStatus

  constructor({ title, status }: TNewTodo) {
    super()
    this.title = title
    this.status = status
  }
}
