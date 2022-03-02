import { useCallback, useState } from "react";

export type UseTodoReturnType = {
  state: State;
  addTask: VoidFunction;
  cancelInput: VoidFunction;
  inputTodo: (value: string) => void;
  checkTodo: (id: number) => void;
  registerTodo: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  whenTodo: WhenTodo;
};
type WhenTodo = "今日する" | "明日する" | "今度する";
type State = {
  todoList: Todo[];
  isTyping: boolean;
  value: string;
};
export const useTodo = (whenTodo: WhenTodo): UseTodoReturnType => {
  const [state, setState] = useState<State>({
    todoList: [],
    isTyping: false,
    value: "",
  });

  const addTask = useCallback(() => {
    setState({ ...state, isTyping: true });
  }, [state]);

  const cancelInput = useCallback(() => {
    setState({ ...state, isTyping: false });
  }, [state]);

  const inputTodo = useCallback(
    (value: string) => {
      setState({ ...state, value });
    },
    [state]
  );

  const checkTodo = useCallback(
    (id: number) => {
      state.todoList.forEach((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
      });
      setState({ ...state });
    },
    [state]
  );

  const registerTodo = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter" || !state.value) return;

      const newTodo: Todo = {
        id: state.todoList[state.todoList.length - 1]?.id + 1 || 1,
        todo: state.value,
        completed: false,
        whenTodo,
      };
      setState({ ...state, todoList: [...state.todoList, newTodo], value: "" });
    },
    [state]
  );

  return { state, addTask, cancelInput, inputTodo, checkTodo, registerTodo };
};
