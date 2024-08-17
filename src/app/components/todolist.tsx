import { Icon } from "@iconify/react";

interface Props {
  todos: Todo[];
  onStatusChange: (id: string, status: Todo["status"]) => void;
  onEditTodo: (updatedTodo: Todo) => void;
  handleDeleteTodo: (id: string) => void;
}

interface Todo {
  id: string;
  title: string;
  description: string;
  endDate: string;
  status: TodoStatus;
}
type TodoStatus = "Pending" | "In Progress" | "Done";

const TodoList: React.FC<Props> = ({
  todos,
  onStatusChange,
  onEditTodo,
  handleDeleteTodo,
}) => {
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} className="p-4 bg-white rounded-md shadow-md mb-4">
          <div>
            <h3 className="text-lg font-semibold">Title : {todo.title}</h3>
            <p>Description : {todo.description}</p>
            <p>End Date : {todo.endDate}</p>
            <div className="flex justify-between">
              <div className="mt-2">
                <select
                  value={todo.status}
                  onChange={(e) =>
                    onStatusChange(todo.id, e.target.value as Todo["status"])
                  }
                  className="p-2 border border-gray-300 rounded-md">
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div className="flex justify-evenly items-center">
                <span onClick={() => onEditTodo(todo)} className="m-2">
                  <Icon icon="basil:edit-outline" width={32} height={32} />
                </span>
                <span onClick={() => handleDeleteTodo(todo.id)} className="m-2">
                  <Icon
                    icon="fluent:delete-28-regular"
                    width={32}
                    height={32}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
