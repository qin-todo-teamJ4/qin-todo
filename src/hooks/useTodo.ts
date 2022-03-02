/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from "react";
import type { SetterOrUpdater } from "recoil";
import { atom, useRecoilState } from "recoil";

export type UseTodoReturnType = {
  todoListState: Todo[];
  inputState: InputState;
  addTask: VoidFunction;
  cancelInput: VoidFunction;
  inputTodo: (value: string) => void;
  checkTodo: (id: number) => void;
  registerTodo: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  setTodoListState: SetterOrUpdater<Todo[]>;
};

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  whenTodo: WhenTodo;
};
type WhenTodo = "今日する" | "明日する" | "今度する";

type InputState = {
  isTyping: boolean;
  value: string;
};

export const useTodo = (whenTodo: WhenTodo): UseTodoReturnType => {
  const todoState = atom<Todo[]>({
    key: "todoState",
    default: [],
  });
  const [todoListState, setTodoListState] = useRecoilState(todoState);
  const [inputState, setInputState] = useState<InputState>({
    isTyping: false,
    value: "",
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
      const newData = todoListState.map((todo) => {
        if (todo.id === id) {
          todo.completed = true;
        }
        return todo;
      });
      setTodoListState(newData);
    },
    [todoListState]
  );

  const registerTodo = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter" || !inputState.value) return;

      const newTodo: Todo = {
        id: todoListState[todoListState.length - 1]?.id + 1 || 1,
        todo: inputState.value,
        completed: false,
        whenTodo: "今度する",
      };
      setTodoListState([...todoListState, newTodo]);
      setInputState({ ...inputState, value: "" });
    },
    [inputState, todoListState]
  );

  return {
    todoListState,
    inputState,
    addTask,
    cancelInput,
    inputTodo,
    checkTodo,
    registerTodo,
    setTodoListState,
  };
};
