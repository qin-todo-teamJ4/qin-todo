import { useCallback, useState } from "react";

export type UseTodoReturnType = {
  state: State;
  addTask: VoidFunction;
  cancelInput: VoidFunction;
  inputTodo: (value: string) => void;
  checkTodo: (id: number) => void;
  registerTodo: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

type Todo = { id: number; todo: string; completed: boolean };
type State = {
  todoList: Todo[];
  isCreate: boolean;
  value: string;
};
export const useTodo = (): UseTodoReturnType => {
  const [state, setState] = useState<State>({
    todoList: [],
    isCreate: false,
    value: "",
  });

  const addTask = useCallback(() => {
    setState({ ...state, isCreate: true });
  }, [state]);

  const cancelInput = useCallback(() => {
    setState({ ...state, isCreate: false });
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
      const newTodo = {
        id: state.todoList[state.todoList.length - 1]?.id + 1 || 1,
        todo: state.value,
        completed: false,
      };
      setState({ ...state, todoList: [...state.todoList, newTodo], value: "" });
    },
    [state]
  );

  return { state, addTask, cancelInput, inputTodo, checkTodo, registerTodo };
};
