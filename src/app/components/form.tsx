import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type TodoStatus = "Pending" | "In Progress" | "Done";

interface Todo {
  id: string;
  title: string;
  description: string;
  endDate: string;
  status: TodoStatus;
}

interface Props {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  todos: Todo[];
  selectedTodo?: Todo | null;
  resetSelectedTodo: () => void;
}

export const todoSchema = z.object({
  title: z.string().min(6, "Title is required"),
  description: z.string().min(10, "Description is required"),
  endDate: z.string().min(1, "End Date is required"),
  status: z.enum(["Pending", "In Progress", "Done"]),
});

export type TodoFormSchema = z.infer<typeof todoSchema>;

const TodoForm: React.FC<Props> = ({
  setTodos,
  todos,
  selectedTodo,
  resetSelectedTodo,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TodoFormSchema>({
    resolver: zodResolver(todoSchema),
  });

  useEffect(() => {
    if (selectedTodo) {
      setValue("title", selectedTodo.title);
      setValue("description", selectedTodo.description);
      setValue("endDate", selectedTodo.endDate);
      setValue("status", selectedTodo.status);
    } else {
      reset();
    }
  }, [selectedTodo, setValue, reset]);

  const onSubmit = (data: TodoFormSchema) => {
    if (selectedTodo) {
      handleUpdateTodo(data);
    } else {
      handleAddTodo(data);
    }
    reset();
  };

  const handleAddTodo = (data: TodoFormSchema) => {
    const newTodo: Todo = {
      id: uuidv4(),
      ...data,
    };
    setTodos([...todos, newTodo]);
  };

  const handleUpdateTodo = (data: TodoFormSchema) => {
    setTodos(
      todos.map((todo) =>
        todo.id === selectedTodo!.id ? { ...todo, ...data } : todo
      )
    );
    resetSelectedTodo();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 bg-gray-100 rounded-md">
      <div className="mb-4">
        <label className="block mb-2">Title</label>
        <input
          {...register("title")}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea
          {...register("description")}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.description && (
          <p className="text-red-600">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2">End Date</label>
        <input
          type="date"
          {...register("endDate")}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.endDate && (
          <p className="text-red-600">{errors.endDate.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2">Status</label>
        <select
          {...register("status")}
          className="w-full p-2 border border-gray-300 rounded-md">
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        {errors.status && (
          <p className="text-red-600">{errors.status.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded-md">
        {selectedTodo ? "Update TODO" : "Add TODO"}
      </button>
    </form>
  );
};

export default TodoForm;
