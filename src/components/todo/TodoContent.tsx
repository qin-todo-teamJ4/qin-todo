import type { VFC } from "react";

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
      <p className={todo.completed ? "line-through " : ""}>{todo.todo}</p>
    </li>
  );
};
