import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import { Theme } from "@radix-ui/themes";
import { FormEventHandler, ReactElement } from "react";

type TodoFormData = {
  title: string,
  body: string
};

const TodoCreate = () =>  {
  const {
    data,
    setData,
    post,
    errors,
    processing
  } = useForm<TodoFormData>({ title: '', body: '' });

  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/todos');
  };

  console.log({ errors, processing });

  return (
    <>
      <Head title="Create a Todo" />
      
      <div className="p-4">
        <h1>Create a Todo</h1>
        <form className="flex flex-col w-1/2 gap-2" onSubmit={handleFormSubmit}>
          <input
            type="text"
            className={errors.title ? '!border-red-500 border' : 'border'}
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
          />
          {errors.title && (<small className="text-red-500">{errors.title}</small>)}

          <textarea
            className={errors.body ? '!border-red-500 border' : 'border'}
            value={data.body}
            onChange={(e) => setData('body', e.target.value)}
          ></textarea>
          {errors.body && (<small className="text-red-500">{errors.body}</small>)}

          <button
            className="border"
            disabled={processing}
          >Save</button>
        </form>
      </div>
    </>
  )
}

// use persistent layout, component layout will not rerender between page visits
TodoCreate.layout = (page: ReactElement) => (
  <AppLayout>
    <Theme>
      {page}
    </Theme>
  </AppLayout>
);

export default TodoCreate;