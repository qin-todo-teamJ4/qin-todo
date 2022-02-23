import type { VFC } from "react";
import { FiTrash2 } from "react-icons/fi";
import { HiOutlineDuplicate } from "react-icons/hi";

type Todo = { id: number; todo: string; completed: boolean };

type Props = {
  todo: Todo;
  checkTodo: (id: number) => void;
};

export const TodoContent: VFC<Props> = (props) => {
  const { todo, checkTodo } = props;
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
      <FiTrash2 className="text-2xl ml-2" />
    </li>
  );
};
