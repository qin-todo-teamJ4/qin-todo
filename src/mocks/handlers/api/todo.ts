import type { DefaultRequestBody, PathParams } from "msw";
import { rest } from "msw";

import type { Todo, TodoBody } from "../../../types/todo";
import { API } from "../../../utils/path";
import { todoList } from "../../data/todo";

/**
 * 作成日が当日以前かつcompletedがtrueのTodoは除外
 * whenTodoが「明日する」でcreatedAtが昨日以前のTodoはwhenTodoを「今日する」にする
 */
const sortingTodo = (): Todo[] => {
  return todoList.filter((todo) => {
    if (todo.createdAt < new Date() && todo.completed) {
      return;
    }
    if (todo.whenTodo === "明日する" && todo.createdAt <= new Date()) {
      todo.whenTodo = "今日する";
      return todo;
    }
    return todo;
  });
};

export const todoHandlers = [
  rest.get<DefaultRequestBody, PathParams, Todo[]>(
    API.todo,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(sortingTodo()));
    }
  ),
  rest.post<TodoBody>(API.todo, (req, res, ctx) => {
    const newTodo: Todo = {
      id: todoList[todoList.length - 1]?.id + 1 || 1,
      ...req.body,
      createdAt: new Date(),
    };
    todoList.push(newTodo);
    return res(ctx.status(200), ctx.json(sortingTodo()));
  }),
];
