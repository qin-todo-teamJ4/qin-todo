import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useUser } from "src/lib/auth";

import { Header } from "../components/Layouts/Header";
import { TodoList } from "../components/todo/TodoList";

const Home: NextPage = () => {
  const handle = async () => {
    const res = await fetch("/users");
    const todoRes = await fetch("/todos");
    const users = await res.json();
    const todos = await todoRes.json();
    // eslint-disable-next-line no-console
    console.log(users);
    // eslint-disable-next-line no-console
    console.log(todos);
  };
  const router = useRouter();
  const user = useUser();
  if (user === null) router.push("/auth/signin");

  return (
    <>
      <Header />
      <div className="flex justify-around mt-8">
        <TodoList title="今日する" mainColor="text-rose-500" />
        <TodoList title="明日する" mainColor="text-orange-500" />
        <TodoList title="今度する" mainColor="text-yellow-400" />
        <button onClick={handle}>ボタン</button>
      </div>
    </>
  );
};

export default Home;
