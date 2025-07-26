import { useForm } from "@inertiajs/react";
import { IconButton } from "@radix-ui/themes";
import { SquarePen } from "lucide-react";
import { MouseEventHandler } from "react";

type ClickParam = {
  todoId: number,
  get: (url: string) => void
}
type ClickFn = (params: ClickParam) => Promise<void>;

export default ({ handleTodoEdit, todoId }: { handleTodoEdit:  ClickFn, todoId: number}) => {
  const form = useForm<{ todoId: number }>({ todoId });

  const handler: MouseEventHandler = async () => {
    const result = await handleTodoEdit({
      todoId, get: form.get,
    });
    return result;
  };

  return (<>
    <IconButton
      color="blue"
      onClick={handler}
      loading={form.processing}
    >
      <SquarePen />
    </IconButton>
  </>);
}