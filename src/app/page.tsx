"use client";

import { useEffect, useState } from "react";
import TodoForm from "../app/components/form";
import TodoList from "../app/components/todolist";

type TodoStatus = "Pending" | "In Progress" | "Done";

interface Todo {
  id: string;
  title: string;
  description: string;
  endDate: string;
  status: TodoStatus;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleStatusChange = (id: string, status: Todo["status"]) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, status } : todo))
    );
  };

  const handleEditTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const resetSelectedTodo = () => {
    setSelectedTodo(null);
  };
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">TODO Application</h1>
      <TodoForm
        setTodos={setTodos}
        todos={todos}
        selectedTodo={selectedTodo}
        resetSelectedTodo={resetSelectedTodo}
      />
      <div className="mt-3">
        <TodoList
          todos={todos}
          onStatusChange={handleStatusChange}
          onEditTodo={handleEditTodo}
          handleDeleteTodo={handleDeleteTodo}
        />
      </div>
    </div>
  );
};

export default Home;
