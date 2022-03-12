import { useCallback, useState } from "react";
import type { SetterOrUpdater } from "recoil";
import { atom, useRecoilState } from "recoil";

import { useUser } from "../lib/auth";
import type { Todo, TodoBody, WhenTodo } from "../types/todo";
import { API } from "../utils/path";
import { useRequest } from "./useRequest";

export type UseTodoReturnType = {
  todoState: Todo[];
  inputState: InputState;
  showingTodoList: Todo[];
  addTask: VoidFunction;
  cancelInput: VoidFunction;
  inputTodo: (value: string) => void;
  checkTodo: (id: number) => void;
  registerTodo: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  setTodoState: SetterOrUpdater<Todo[]>;
  deleteTodo: (id: number) => void;
};

type InputState = {
  isTyping: boolean;
  value: string;
};

const todoAtom = atom<Todo[]>({
  key: "todoState",
  default: [],
});
export const useTodo = (whenTodo?: WhenTodo): UseTodoReturnType => {
  const user = useUser();
  const userId = user?.uid || "";

  const { postRequest, deleteRequest } = useRequest(userId);
  const [todoState, setTodoState] = useRecoilState(todoAtom);
  const [inputState, setInputState] = useState<InputState>({
    isTyping: false,
    value: "",
  });

  const showingTodoList = todoState.filter((todoList) => {
    return todoList.whenTodo === whenTodo;
  });

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
      const index = todoState.findIndex((todo) => {
        return todo.id === id;
      });
      const newData: Todo[] = [
        ...todoState.slice(0, index),
        { ...todoState[index], completed: !todoState[index].completed },
        ...todoState.slice(index + 1),
      ];

      setTodoState(newData);
    },
    [todoState]
  );

  const registerTodo = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter" || !inputState.value || !whenTodo || !userId)
        return;

      const newTodo: TodoBody = {
        userId,
        todo: inputState.value,
        completed: false,
        whenTodo,
      };

      const response = await postRequest<TodoBody, Todo[]>(API.todo, newTodo);
      if (response !== void 0) {
        setTodoState(response);
      }
      setInputState({ ...inputState, value: "" });
    },
    [inputState, todoState]
  );

  const deleteTodo = useCallback(
    async (id: number) => {
      const response = await deleteRequest<Todo[]>(`${API.todo}/${id}`);
      if (response !== void 0) {
        setTodoState(response);
      }
    },
    [todoState]
  );

  return {
    todoState,
    inputState,
    showingTodoList,
    addTask,
    cancelInput,
    inputTodo,
    checkTodo,
    registerTodo,
    setTodoState,
    deleteTodo,
  };
};
