import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { SharedData } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";

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
        <h2>Welcome, {auth.user.name}</h2>
        <div className="mt-2">
          <Button type="button">
            <Link href={route('todo.create')}>Create a Todo</Link>
          </Button>
          <ul className="mt-2">
            {todos && todos.map(({ title }, index) => (
              <li key={`todos-${index}`}>{title}</li>
            ))}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
};