import type { VFC } from "react";

import { useTodo } from "../../hooks/useTodo";
import { AddTodoButton } from "../common/AddTodoButton";
import { TodoContent } from "./TodoContent";
import { TodoForm } from "./TodoForm";

type WhenTodo = "今日する" | "明日する" | "今度する";
type MainColor = "text-rose-500" | "text-orange-500" | "text-yellow-400";

type Props = {
  whenTodo: WhenTodo;
  mainColor: MainColor;
};

export const TodoList: VFC<Props> = (props) => {
  const { whenTodo, mainColor } = props;
  const {
    todoListState,
    inputState,
    registerTodo,
    inputTodo,
    cancelInput,
    checkTodo,
    addTask,
  } = useTodo(props.whenTodo);

  return (
    <div className="ml-5 w-64">
      <h2 className={`${mainColor} mb-2 text-2xl font-semibold`}>{whenTodo}</h2>
      {inputState.isTyping ? (
        <TodoForm
          value={inputState.value}
          registerTodo={registerTodo}
          inputTodo={inputTodo}
          cancelInput={cancelInput}
        />
      ) : (
        <div className="h-10 invisible">invisible</div>
      )}
      <ul>
        {todoListState?.map((todo) => {
          return (
            <TodoContent key={todo.id} todo={todo} checkTodo={checkTodo} />
          );
        })}
      </ul>
      <AddTodoButton addTask={addTask} />
    </div>
  );
};
