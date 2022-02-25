import type { VFC } from "react";

type Props = {
  value: string;
  registerTodo: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  inputTodo: (value: string) => void;
  cancelInput: VoidFunction;
};
export const TodoForm: VFC<Props> = (props) => {
  const { value, registerTodo, inputTodo, cancelInput } = props;
  return (
    <div className="flex">
      <input
        type="checkbox"
        readOnly
        className="rounded-full focus:outline-none w-6 h-6 mr-3"
      />
      <input
        className="border-none  pointer-events-auto text-gray-700  focus:outline-none"
        type="text"
        autoFocus
        value={value}
        onKeyPress={(e) => {
          registerTodo(e);
        }}
        onChange={(e) => {
          inputTodo(e.target.value);
        }}
        onBlur={cancelInput}
      />
    </div>
  );
};
