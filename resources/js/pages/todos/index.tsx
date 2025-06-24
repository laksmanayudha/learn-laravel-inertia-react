import AppLayout from "@/layouts/app-layout";
import { SharedData } from "@/types";
import { Head, usePage } from "@inertiajs/react";

type TodoItem = {
  title: string;
  body: string
};

export default function TodoIndex({ todos }: { todos: TodoItem[] }) {
  const { auth } = usePage<SharedData>().props;

  return (
    <AppLayout>
      <Head title="Todos List" />
      <div className="p-4">
        <h2>{auth.user.name}</h2>

        <ul>
          {todos && todos.map(({ title }) => (
            <li>{title}</li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
};