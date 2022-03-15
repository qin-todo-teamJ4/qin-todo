import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "src/lib/auth";

import { Header } from "../components/Layouts/Header";
import { TodoList } from "../components/todo/TodoList";
import { useRequest } from "../hooks/useRequest";
import { useTodo } from "../hooks/useTodo";
import type { Todo } from "../types/todo";
import { API } from "../utils/path";

const Home: NextPage = () => {
  const router = useRouter();
  const user = useUser();
  const { getRequest } = useRequest();
  const { setTodoState } = useTodo();
  if (user === null) router.push("/auth/signin");

  const fetchData = async () => {
    const response = await getRequest<Todo[]>(API.todo);
    if (response !== void 0) {
      setTodoState(response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="flex justify-around mt-8">
        <TodoList whenTodo="今日する" mainColor="text-rose-500" />
        <TodoList whenTodo="明日する" mainColor="text-orange-500" />
        <TodoList whenTodo="今度する" mainColor="text-yellow-400" />
      </div>
    </>
  );
};

export default Home;
