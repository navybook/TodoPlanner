import { useState, useEffect } from "react"
import { Task } from "../types"
import TaskCard from "./TaskCard";

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const [status, setStatus] = useState(0);

  useEffect(() => {
    fetch("/api/tasks", {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  function getCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]').content;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, description, due_date, status };

    fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": getCsrfToken(),
      },
      body: JSON.stringify(newTask),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, data]);
        setTitle("");
        setDescription("");
        setDueDate("");
        setStatus(0);
      })
      .catch((error) => console.error("Error creating task:", error));
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
                  <TaskCard task={task} />
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={() => setShowModal(true)} 
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600">
            タスクを追加
          </button>

        </div>

        <div className="w-full p-4 bg-green-200 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">完了したタスク</h2>
          <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
            <ul>
              {tasks.filter(task => task.status === "completed").map(task => (
                <li key={task.id} className="p-2 bg-white shadow rounded mb-2">
                  <TaskCard task={task} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">新しいタスク</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input 
                type="text" 
                placeholder="タスク名" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 border rounded" required
              />
              <textarea 
                placeholder="タスクの詳細" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 border rounded"
              />
              <label>期限</label>
              <input 
                type="date" 
                value={due_date} 
                onChange={(e) => setDueDate(e.target.value)}
                className="p-2 border rounded"
              />
              <label>状態</label>
              <select 
                value={status} 
                onChange={(e) => setStatus(Number(e.target.value))} 
                className="p-2 border rounded"
              >
                <option value={0}>未完了</option>
                <option value={1}>着手</option>
                <option value={2}>完了</option>
              </select>
              <div className="flex gap-2">
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600">追加</button>
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-500 text-white py-2 px-4 rounded shadow hover:bg-gray-600">キャンセル</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
