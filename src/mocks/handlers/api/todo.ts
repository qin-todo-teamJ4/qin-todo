import type { DefaultRequestBody, PathParams } from "msw";
import { rest } from "msw";

import type { Todo, TodoRequestBody } from "../../../types/todo";
import { API } from "../../../utils/path";
import { todoList } from "../../data/todo";

/**
 * userIdが一致したTodoを抽出
 * 作成日が当日以前かつcompletedがtrueのTodoは除外
 * whenTodoが「明日する」でcreatedAtが昨日以前のTodoはwhenTodoを「今日する」にする
 */
const sortingTodo = (userId: string): Todo[] => {
  return todoList
    .filter((todo) => {
      return todo.userId === userId;
    })
    .filter((todo) => {
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
      const userId = req.headers.get("userid");
      if (!userId) return res(ctx.status(403));
      return res(ctx.status(200), ctx.json(sortingTodo(userId)));
    }
  ),

  rest.post<TodoRequestBody>(API.todo, (req, res, ctx) => {
    const userId = req.headers.get("userid");
    if (!userId) return res(ctx.status(403));
    const newTodo: Todo = {
      id: todoList[todoList.length - 1]?.id + 1 || 1,
      ...req.body,
      userId,
      createdAt: new Date(),
    };
    todoList.push(newTodo);
    return res(ctx.status(200), ctx.json(sortingTodo(userId)));
  }),

  rest.put<TodoRequestBody>(`${API.todo}/:id`, (req, res, ctx) => {
    const userId = req.headers.get("userid");
    if (!userId) return res(ctx.status(403));
    const updateTodoId = Number(req.params.id);
    const updateTodoIndex = todoList.findIndex((todo) => {
      return todo.id === updateTodoId;
    });
    const newTodo: Todo = {
      ...todoList[updateTodoIndex],
      ...req.body,
    };
    todoList[updateTodoIndex] = newTodo;
    return res(ctx.status(200), ctx.json(sortingTodo(userId)));
  }),

  rest.delete<DefaultRequestBody, PathParams, Todo[]>(
    `${API.todo}/:id`,
    (req, res, ctx) => {
      const userId = req.headers.get("userid");
      if (!userId) return res(ctx.status(403));
      const deleteTodoId = Number(req.params.id);
      const deleteTodoIndex = todoList.findIndex((todo) => {
        return todo.id === deleteTodoId;
      });

      todoList.splice(deleteTodoIndex, 1);
      return res(ctx.status(200), ctx.json(sortingTodo(userId)));
    }
  ),
];
