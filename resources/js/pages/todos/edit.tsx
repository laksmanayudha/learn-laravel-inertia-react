import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { Box, Container, Flex, Text, TextField, Theme } from "@radix-ui/themes";
import { ReactElement } from "react";

type TodoItem = {
  id: number,
  title: string;
  body: string
};

const TodoEdit = ({ todo }: { todo: TodoItem }) => {
  return (
  <>
    <Head title="Edit a Todo" />

    <div className="p-4">
      <h1 className="mb-2">Edit a Todo</h1>
      <form onSubmit={() => {}}>
        <Flex className="w-1/2">
          <Container>
            <Text
              className="text-sm"
              as="label"
              htmlFor="titleTextField"
            >
              Todo Title
            </Text>
            <TextField.Root
              id="titleTextField"
              placeholder="Your Title"
              value={todo.title}
              onChange={() => {}}
            />
          </Container>
        </Flex>
      </form>
    </div>
  </>);
} 

TodoEdit.layout = (page: ReactElement) => (
  <AppLayout>
    <Theme>
      {page}
    </Theme>
  </AppLayout>
)

export default TodoEdit;