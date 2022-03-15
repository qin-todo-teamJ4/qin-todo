import type { VFC } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { HiOutlineDuplicate } from "react-icons/hi";
import { useRecoilState } from "recoil";

import { todoState, useTodo } from "../../hooks/useTodo";
import type { Todo } from "../../types/todo";

type Props = {
  todo: Todo;
  index: number;
  checkTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  copyTodo: (id: number) => void;
};

export const TodoContent: VFC<Props> = (props) => {
  const { checkTodo, deleteTodo, copyTodo, index } = props;
  const [todoList, setTodoList] = useRecoilState(todoState);
  const [state, setState] = useState({
    isEdit: false,
    beforeEditValue: todoList[index].todo,
  });
  const { updateTodo, updateTodoList } = useTodo(props.todo.whenTodo);

  const editTodo = useCallback(
    (value: string) => {
      const newData = updateTodoList(todoList, index, value);
      setTodoList(newData);
    },
    [todoList]
  );

  const onKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      const newData = { ...todoList[index], todo: todoList[index].todo };
      updateTodo(newData);
      setState({ isEdit: false, beforeEditValue: todoList[index].todo });
    },
    [todoList]
  );

  const onBlurForm = useCallback(() => {
    const newData = updateTodoList(todoList, index, state.beforeEditValue);
    setTodoList(newData);
    setState({ ...state, isEdit: false });
  }, [state.isEdit, todoList]);

  return (
    <li className="group flex text-gray-400 py-1 text-lg cursor-pointer">
      <input
        type="checkbox"
        className="rounded-full focus:outline-none w-6 h-6 mr-3"
        onChange={() => {
          checkTodo(props.todo.id);
        }}
      />
      {state.isEdit ? (
        <input
          className="border-none  pointer-events-auto text-gray-700   focus:outline-none"
          autoFocus
          value={props.todo.todo}
          onKeyPress={(e) => {
            onKeyPress(e);
          }}
          onChange={(e) => {
            editTodo(e.target.value);
          }}
          type="text"
          onBlur={onBlurForm}
        />
      ) : (
        <p
          className={props.todo.completed ? "line-through " : ""}
          style={{ minWidth: 120 }}
          onClick={() => {
            setState({ ...state, isEdit: true });
          }}
        >
          {props.todo.todo}
        </p>
      )}
      <div className="hidden group-hover:flex">
        <HiOutlineDuplicate
          onClick={() => {
            copyTodo(props.todo.id);
          }}
          className="text-2xl ml-12"
        />
        <FiTrash2
          onClick={() => {
            deleteTodo(props.todo.id);
          }}
          className="text-2xl ml-2"
        />
      </div>
    </li>
  );
};
