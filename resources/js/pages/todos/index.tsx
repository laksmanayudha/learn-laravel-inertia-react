import { Button } from "@/components/ui/button";
import { Table, Theme } from "@radix-ui/themes";
import AppLayout from "@/layouts/app-layout";
import { SharedData } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
// import { useRoute } from "ziggy-js";

type TodoItem = {
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

export default function TodoIndex({ pagination }: { pagination: PaginateResponse }) {
  const { auth } = usePage<SharedData>().props;
  const { data, links } = pagination;

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
              <Table.Root variant="surface">
                <Table.Header>
                  <Table.ColumnHeaderCell>Todo Title</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Todo Description</Table.ColumnHeaderCell>
                </Table.Header>
                <Table.Body>
                  {data.length && data.map(({ title, body }, index) => (
                    <Table.Row key={index}>
                      <Table.RowHeaderCell>{title}</Table.RowHeaderCell>
                      <Table.Cell>{body}</Table.Cell>
                    </Table.Row>
                  ))}
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