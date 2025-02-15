import { useState, useEffect } from "react";
import { Task } from "../types";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "X-CSRF-Token": getCsrfToken()
        }
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  function getCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]').content;
  }

  const handleCreateTask = async (newTask) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": getCsrfToken(),
        },
        body: JSON.stringify(newTask),
        credentials: "include",
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setTasks([...tasks, data]);
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdate = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    fetchTasks();
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    fetchTasks();
  };

  return (
    <div className="container overflow-y-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Todoリスト</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full p-4 bg-sky-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">未完了タスク</h2>
          <div className="overflow-y-auto" style={{ maxHeight: "410px" }}>
            <ul>
              {tasks.filter(task => task.status !== "completed").map(task => (
                <li key={task.id} className="p-2 bg-white shadow rounded mb-2">
                  <TaskCard task={task} onUpdate={handleUpdate} onDelete={handleDelete} />
                </li>
              ))}
            </ul>
          </div>
          <TaskForm 
            onSubmit={handleCreateTask} 
          />
        </div>

        <div className="w-full p-4 bg-green-200 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">完了したタスク</h2>
          <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
            <ul>
              {tasks.filter(task => task.status === "completed").map(task => (
                <li key={task.id} className="p-2 bg-white shadow rounded mb-2">
                  <TaskCard task={task} onUpdate={handleUpdate} onDelete={handleDelete} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
