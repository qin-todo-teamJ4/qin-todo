import type { VFC } from "react";
import { FiTrash2 } from "react-icons/fi";
import { HiOutlineDuplicate } from "react-icons/hi";

import type { Todo } from "../../types/todo";

type Props = {
  todo: Todo;
  checkTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

export const TodoContent: VFC<Props> = (props) => {
  const { todo, checkTodo, deleteTodo } = props;
  return (
    <li className="flex text-gray-400 py-1 text-lg">
      <input
        type="checkbox"
        className="rounded-full focus:outline-none w-6 h-6 mr-3"
        onChange={() => {
          checkTodo(todo.id);
        }}
      />
      <p
        className={todo.completed ? "line-through " : ""}
        style={{ minWidth: 120 }}
      >
        {todo.todo}
      </p>
      <HiOutlineDuplicate className="text-2xl ml-12" />
      <FiTrash2
        onClick={() => {
          deleteTodo(todo.id);
        }}
        className="text-2xl ml-2"
      />
    </li>
  );
};
