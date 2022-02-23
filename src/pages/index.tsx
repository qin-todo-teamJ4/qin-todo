import type { NextPage } from "next";

import { Header } from "../components/Layouts/Header";
import { TodoList } from "../components/todo/TodoList";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <TodoList title="今日する" mainColor="text-rose-500" />
        <TodoList title="明日する" mainColor="text-orange-500" />
        <TodoList title="今度する" mainColor="text-yellow-400" />
      </div>
    </>
  );
};

export default Home;
