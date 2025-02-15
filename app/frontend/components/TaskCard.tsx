import { useState } from "react";
import { Task } from "../types";
import Modal from "./ui/Modal";
import useModal from "../hooks/useModal";

interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

export default function TaskCard({
  task,
  onUpdate,
  onDelete,
} : TaskCardProps) {
  const { modalRef, openModal, closeModal } = useModal();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.due_date ? task.due_date.split('T')[0] : '');
  const [status, setStatus] = useState(task.status);

  const handleUpdate = () => {
    const updatedTask = { ...task, id: undefined, title, description, due_date: dueDate, status };
    fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        onUpdate(data);
        closeModal();
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const handleDelete = () => {
    fetch(`/api/tasks/${task.id}`, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
      },
    })
      .then(() => {
        onDelete(task.id);
        closeModal();
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <div>
      <div className="rounded border border-gray-200 bg-white hover:bg-blue-200">
        <div className="relative flex min-h-[80px] flex-col">
          <div className="link m-2 mr-10 break-words text-sm" onClick={openModal}>{task.title}</div>
        </div>
      </div>
      <Modal modalRef={modalRef}>
        <div className="flex">
          <h3 className="my-2 flex-1 border-b border-gray-300 text-3xl font-bold">
            タスク詳細
          </h3>
        </div>
        <div className="mb-2 text-lg">タイトル</div>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="p-2 border rounded w-full"
        />
        <div className="mb-2 text-lg">詳細</div>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="p-2 border rounded w-full"
        />
        <div className="mb-2 text-lg">期限</div>
        <input 
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
          className="p-2 border rounded w-full"
        />
        <div className="mb-2 text-lg">状態</div>
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
          className="p-2 border rounded w-full"
        >
          <option value={'unfinished'}>未完了</option>
          <option value={'start'}>着手</option>
          <option value={'completed'}>完了</option>
        </select>
        <div className="flex gap-2 mt-4">
          <button onClick={handleUpdate} className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600">更新</button>
          <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600">削除</button>
          <button onClick={closeModal} className="bg-gray-500 text-white py-2 px-4 rounded shadow hover:bg-gray-600">キャンセル</button>
        </div>
      </Modal>
    </div>
  );
}
