import type { VFC } from "react";
import { IconContext } from "react-icons";
import { AiFillPlusCircle } from "react-icons/ai";

type Props = {
  addTask: VoidFunction;
};

export const AddTodoButton: VFC<Props> = (props) => {
  const { addTask } = props;
  return (
    <div
      onClick={addTask}
      className="flex text-base cursor-pointer text-gray-400 mt-2"
    >
      <IconContext.Provider value={{ size: "24px" }}>
        <AiFillPlusCircle />
      </IconContext.Provider>
      <p className="ml-2">タスクを追加する</p>
    </div>
  );
};
