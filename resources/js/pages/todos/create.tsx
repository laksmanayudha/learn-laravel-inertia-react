import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { ReactElement } from "react";

const TodoCreate =  () =>  {
  return (
    <>
    <Head title="Create a Todo" />
      <h1>Hello Worlds</h1>
    </>
  )
}

// use persistent layout, component layout will not rerender between page visits
TodoCreate.layout = (page: ReactElement) => (
  <AppLayout>
    {page}
  </AppLayout>
);

export default TodoCreate;