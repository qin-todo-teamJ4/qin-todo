export type WhenTodo = "今日する" | "明日する" | "今度する";

export type Todo = {
  id: number;
  userId: string;
  todo: string;
  completed: boolean;
  whenTodo: WhenTodo;
  createdAt: Date;
};

export class TodoRequestBody {
  constructor(
    public userId: string,
    public todo: string,
    public completed: boolean,
    public whenTodo: WhenTodo
  ) {}
}
