import { useCallback, useState } from "react";
import type { SetterOrUpdater } from "recoil";
import { atom, useRecoilState } from "recoil";

import { useUser } from "../lib/auth";
import type { Todo, WhenTodo } from "../types/todo";
import { TodoRequestBody } from "../types/todo";
import { API } from "../utils/path";
import { useRequest } from "./useRequest";

export type UseTodoReturnType = {
  todoList: Todo[];
  inputState: InputState;
  showingTodoList: Todo[];
  addTask: VoidFunction;
  cancelInput: VoidFunction;
  inputTodo: (value: string) => void;
  checkTodo: (id: number) => void;
  registerTodo: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  setTodoList: SetterOrUpdater<Todo[]>;
  deleteTodo: (id: number) => void;
  copyTodo: (id: number) => void;
  updateTodo: (todo: Todo) => void;
  updateTodoList: (todoList: Todo[], index: number, value: string) => Todo[];
};

type InputState = {
  isTyping: boolean;
  value: string;
};

export const todoState = atom<Todo[]>({
  key: "todoState",
  default: [],
});
export const useTodo = (whenTodo?: WhenTodo): UseTodoReturnType => {
  const user = useUser();
  const userId = user?.uid || "";

  const { postRequest, deleteRequest, putRequest } = useRequest(userId);
  const [todoList, setTodoList] = useRecoilState(todoState);
  const [inputState, setInputState] = useState<InputState>({
    isTyping: false,
    value: "",
  });

  const showingTodoList = todoList.filter((todoList) => {
    return todoList.whenTodo === whenTodo;
  });

  const updateTodoList = (
    todoList: Todo[],
    index: number,
    value: string | boolean
  ): Todo[] => {
    const target =
      typeof value === "string" ? { todo: value } : { completed: value };
    return [
      ...todoList.slice(0, index),
      { ...todoList[index], ...target },
      ...todoList.slice(index + 1),
    ];
  };

  const addTask = useCallback(() => {
    setInputState({ ...inputState, isTyping: true });
  }, [inputState]);

  const cancelInput = useCallback(() => {
    setInputState({ ...inputState, isTyping: false });
  }, [inputState]);

  const inputTodo = useCallback(
    (value: string) => {
      setInputState({ ...inputState, value });
    },
    [inputState]
  );

  const checkTodo = useCallback(
    (id: number) => {
      const index = todoList.findIndex((todo) => {
        return todo.id === id;
      });

      const newData = updateTodoList(
        todoList,
        index,
        !todoList[index].completed
      );

      setTodoList(newData);
    },
    [todoList]
  );

  const registerTodo = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter" || !inputState.value || !whenTodo || !userId)
        return;
      const newTodo = new TodoRequestBody(
        userId,
        inputState.value,
        false,
        whenTodo
      );
      const response = await postRequest<TodoRequestBody, Todo[]>(
        API.todo,
        newTodo
      );
      if (response !== void 0) {
        setTodoList(response);
      }
      setInputState({ ...inputState, value: "" });
    },
    [inputState, todoList]
  );

  const copyTodo = useCallback(
    async (id: number) => {
      if (!whenTodo || !userId) return;

      const copyTarget = todoList.find((todo) => {
        return todo.id === id;
      });
      if (!copyTarget) return;
      const newTodo = new TodoRequestBody(
        userId,
        copyTarget.todo,
        copyTarget.completed,
        whenTodo
      );
      const response = await postRequest<TodoRequestBody, Todo[]>(
        API.todo,
        newTodo
      );
      if (response !== void 0) {
        setTodoList(response);
      }
      setInputState({ ...inputState, value: "" });
    },
    [todoList]
  );
  const deleteTodo = useCallback(
    async (id: number) => {
      const response = await deleteRequest<Todo[]>(`${API.todo}/${id}`);
      if (response !== void 0) {
        setTodoList(response);
      }
    },
    [todoList]
  );

  const updateTodo = useCallback(
    async (todo: Todo) => {
      if (!whenTodo || !userId) return;
      const newTodo = new TodoRequestBody(userId, todo.todo, false, whenTodo);
      const response = await putRequest<TodoRequestBody, Todo[]>(
        `${API.todo}/${todo.id}`,
        newTodo
      );
      if (response !== void 0) {
        setTodoList(response);
      }
    },
    [todoList]
  );

  return {
    todoList,
    copyTodo,
    inputState,
    showingTodoList,
    addTask,
    cancelInput,
    inputTodo,
    checkTodo,
    registerTodo,
    setTodoList,
    deleteTodo,
    updateTodo,
    updateTodoList,
  };
};
