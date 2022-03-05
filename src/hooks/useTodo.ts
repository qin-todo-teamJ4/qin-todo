import { useCallback, useState } from "react";
import type { SetterOrUpdater } from "recoil";
import { atom, useRecoilState } from "recoil";

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
};

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  whenTodo: WhenTodo;
  createdAt: Date;
};
type WhenTodo = "今日する" | "明日する" | "今度する";

type InputState = {
  isTyping: boolean;
  value: string;
};

const todoAtom = atom<Todo[]>({
  key: "todoState",
  default: [],
});
export const useTodo = (whenTodo: WhenTodo): UseTodoReturnType => {
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
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter" || !inputState.value) return;

      const newTodo: Todo = {
        id: todoState[todoState.length - 1]?.id + 1 || 1,
        todo: inputState.value,
        completed: false,
        whenTodo,
        createdAt: new Date(),
      };
      setTodoState([...todoState, newTodo]);
      setInputState({ ...inputState, value: "" });
    },
    [inputState, todoState]
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
  };
};
