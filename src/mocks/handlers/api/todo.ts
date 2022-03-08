import type { DefaultRequestBody, PathParams } from "msw";
import { rest } from "msw";

import type { Todo } from "../../../types/todo";

const todoList: Todo[] = [
  {
    id: 1,
    todo: "todo1",
    completed: false,
    whenTodo: "今日する",
    createdAt: new Date(),
  },
  {
    id: 2,
    todo: "todo2",
    completed: false,
    whenTodo: "明日する",
    createdAt: new Date(),
  },
  {
    id: 3,
    todo: "todo3",
    completed: false,
    whenTodo: "今度する",
    createdAt: new Date(),
  },
  {
    id: 4,
    todo: "todo4",
    completed: false,
    whenTodo: "今度する",
    createdAt: new Date(),
  },
];

export const todoHandlers = [
  rest.get<DefaultRequestBody, PathParams, Todo[]>(
    "/api/todo",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(todoList));
    }
  ),
];
