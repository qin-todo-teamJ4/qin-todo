import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useUser } from "src/lib/auth";

import { Header } from "../components/Layouts/Header";
import { TodoList } from "../components/todo/TodoList";

const Home: NextPage = () => {
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
      </div>
    </>
  );
};

export default Home;
