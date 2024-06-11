import { type Todo as TTodo, type TodoStatus } from "~/types/todo";

export class Todo implements TTodo {
  id: number;
  title: string;
  status: TodoStatus;

  constructor({ id, title, status }: TTodo) {
    this.id = id;
    this.title = title;
    this.status = status;
  }

  // 必要があればメソッド追加
}
