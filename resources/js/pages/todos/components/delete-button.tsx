import { useForm } from "@inertiajs/react";
import { IconButton } from "@radix-ui/themes";
import { Trash } from "lucide-react";

export default ({ todoId }: { todoId: number }) => {
  const { delete: destroy, processing } = useForm();

  const handleDeleteTodo = () => {
    destroy(route('todos.destroy', { id: todoId }));
  };

  return (
    <IconButton
      color="red"
      onClick={() => handleDeleteTodo()}
      loading={processing}
    >
      <Trash />
    </IconButton>
  )
};
