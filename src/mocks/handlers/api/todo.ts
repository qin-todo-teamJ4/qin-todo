import type { DefaultRequestBody, PathParams } from "msw";
import { rest } from "msw";

import type { Todo, TodoBody } from "../../../types/todo";
import { API } from "../../../utils/path";

const todoList: Todo[] = [
  {
    id: 1,
    todo: "todo1",
    completed: false,
    whenTodo: "今日する",
    createdAt: new Date("2022-03-07T21:54:21.460Z"),
  },
  {
    id: 2,
    todo: "todo2",
    completed: false,
    whenTodo: "明日する",
    createdAt: new Date("2022-03-08T21:54:21.460Z"),
  },
  {
    id: 3,
    todo: "todo3",
    completed: false,
    whenTodo: "今度する",
    createdAt: new Date("2022-03-08T21:54:21.460Z"),
  },
  {
    id: 4,
    todo: "todo4",
    completed: false,
    whenTodo: "今度する",
    createdAt: new Date("2022-03-08T21:54:21.460Z"),
  },
];

export const todoHandlers = [
  rest.get<DefaultRequestBody, PathParams, Todo[]>(
    API.todo,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(todoList));
    }
  ),
  rest.post<TodoBody>(API.todo, (req, res, ctx) => {
    const newTodo: Todo = {
      id: todoList[todoList.length - 1]?.id + 1 || 1,
      ...req.body,
      createdAt: new Date(),
    };
    todoList.push(newTodo);
    return res(ctx.status(200), ctx.json(todoList));
  }),
];
