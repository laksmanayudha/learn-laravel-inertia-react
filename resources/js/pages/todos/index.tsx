// import { useRoute } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import { Callout, Flex, Table, Theme } from '@radix-ui/themes';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import TodoDeleteButton from './components/delete-button';
import TodoEditButton from './components/edit-button';

type TodoItem = {
  id: number,
  title: string;
  body: string
};

type PaginationLink = {
  active: boolean,
  label: string,
  url: string,
};

type PaginateResponse = {
  current_page: number,
  data: TodoItem[],
  first_page_url: string,
  last_age_url: string,
  next_page_url: string | null,
  prev_page_url: string | null,
  path: string,
  per_page: number,
  from: number,
  to: number,
  total: number,
  last_page: number,
  links: PaginationLink[]
};

type Flash = {
  message: string | null
};

type ClickParam = {
  todoId: number,
  get: (url: string) => void
};

export default function TodoIndex({ pagination }: { pagination: PaginateResponse }) {
  const { auth, flash } = usePage<SharedData>().props;
  const { data, links } = pagination;
  const [calloutFlash, setCalloutFlash] = useState(flash);
  const { message: calloutMessage } = calloutFlash as Flash;

  const handleEditButton = async ({ get, todoId }: ClickParam) => {
    get(`/todos/${todoId}/edit`);
  }

  useEffect(() => {
    setCalloutFlash(flash);
  }, [flash]);

  if (calloutMessage) {
    setTimeout(() => {
      setCalloutFlash((prev: Flash) => ({...prev, message: null}));
    }, 2000);
  }

  return (
    <AppLayout>
      <Head title="Todos List" />
      <Theme>
        <div className="p-4">
          <h2>Welcome, {auth.user.name}</h2>
          <div className="mt-2">
            <Button type="button">
              <Link href={route('todos.create')}>Create a Todo</Link>
            </Button>

            <div className="mt-4">
              {calloutMessage && (
                <Callout.Root color="green">
                  <Callout.Icon>
                    <Info />
                  </Callout.Icon>
                  <Callout.Text>{calloutMessage}</Callout.Text>
                </Callout.Root>
              )}
            </div>

            <div className="mt-4">
              <Table.Root variant="surface">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>Todo Title</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Todo Description</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {data.length
                  ? data.map(({ title, body, id }) => (
                    <Table.Row key={id}>
                      <Table.RowHeaderCell>{title}</Table.RowHeaderCell>
                      <Table.Cell>{body}</Table.Cell>
                      <Table.Cell>
                        <Flex gap="2">
                          <TodoDeleteButton todoId={id} />
                          <TodoEditButton todoId={id} handleTodoEdit={handleEditButton} />
                        </Flex>
                      </Table.Cell>
                    </Table.Row>
                  ))
                : (<Table.Row key={0}>
                      <Table.Cell colSpan={3}>No Data Available</Table.Cell>
                    </Table.Row>)
                }
                </Table.Body>
              </Table.Root>
            </div>

            <div className="flex gap-2 mt-4">
              {links.length && links.map((link, index) => (
                link.url
                  ? <Link
                      className={`p-1 mx-1 ${link.active ? 'font-bold text-blue-500' : ''}`}
                      href={link.url}
                      key={index}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  : <span
                      className="p-1 mx-1 text-slate-400"
                      key={index}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                  ></span>
              ))}
            </div>
          </div>
        </div>
      </Theme>
    </AppLayout>
  );
};