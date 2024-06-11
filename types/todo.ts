export type TodoStatus = "not_started" | "in_progress" | "completed";

export type Todo = {
  id: number;
  title: string;
  status: TodoStatus;
}
