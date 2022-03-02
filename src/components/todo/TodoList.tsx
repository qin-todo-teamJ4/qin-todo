import type { VFC } from "react";

import { useTodo } from "../../hooks/useTodo";
import { AddTodoButton } from "../common/AddTodoButton";
import { TodoContent } from "./TodoContent";
import { TodoForm } from "./TodoForm";

type Props = {
  title: string;
  mainColor: string;
};

export const TodoList: VFC<Props> = (props) => {
  const { title, mainColor } = props;
  const { state, registerTodo, inputTodo, cancelInput, checkTodo, addTask } =
    useTodo();

  return (
    <div className="ml-5 w-64">
      <h2 className={`${mainColor} mb-2 text-2xl font-semibold`}>{title}</h2>
      {state.isTyping ? (
        <TodoForm
          value={state.value}
          registerTodo={registerTodo}
          inputTodo={inputTodo}
          cancelInput={cancelInput}
        />
      ) : (
        <div className="h-10 invisible">invisible</div>
      )}
      <ul>
        {state.todoList.map((todo) => {
          return (
            <TodoContent key={todo.id} todo={todo} checkTodo={checkTodo} />
          );
        })}
      </ul>
      <AddTodoButton addTask={addTask} />
    </div>
  );
};
