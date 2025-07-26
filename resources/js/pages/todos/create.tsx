import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import { Button, TextArea, TextField, Theme, Text, Spinner } from "@radix-ui/themes";
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

  return (
    <>
      <Head title="Create a Todo" />
      
      <div className="p-4">
        <h1 className="mb-2">Create a Todo</h1>
        <form className="flex flex-col w-1/2 gap-2" onSubmit={handleFormSubmit}>
          <div className="mb-2">
            <Text className="text-sm" as="label" htmlFor="titleTextField">Todo Title</Text>
            <TextField.Root
              id="titleTextField"
              placeholder="Your Title"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className={errors.title ? '!border-red-500 border' : 'border'}
            />
            {errors.title && (<small className="text-red-500">{errors.title}</small>)}
          </div>         

          <div className="mb-2">
            <Text className="text-sm" as="label" htmlFor="bodyTextArea">Title Body</Text>
            <TextArea
              id="bodyTextArea"
              placeholder="Write your todo body here..."
              value={data.body}
              onChange={(e) => setData('body', e.target.value)}
              className={errors.body ? '!border-red-500 border' : 'border'}
            />
            {errors.body && (<small className="text-red-500">{errors.body}</small>)}
          </div>

          <Button disabled={processing}>
            <Spinner loading={processing} />
            Save
          </Button>
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