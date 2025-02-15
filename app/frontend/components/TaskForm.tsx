import { useForm, SubmitHandler } from "react-hook-form";
import Modal from "./ui/Modal";
import useModal from "../hooks/useModal";

interface TaskFormInputs {
  title: string;
  description: string;
  due_date: string;
  status: number;
}

interface TaskFormModalProps {
  onSubmit: (task: TaskFormInputs) => void;
}

export default function TaskFormModal({ onSubmit }: TaskFormModalProps) {
  const { modalRef, openModal, closeModal } = useModal();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormInputs>();

  const submitHandler: SubmitHandler<TaskFormInputs> = (data) => {
    onSubmit(data);
    reset();
    closeModal();
  };

  return (
    <>
      <Modal modalRef={modalRef}>
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">新しいタスク</h2>
          <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-3">
            {/* タイトル */}
            <input
              type="text"
              placeholder="タスク名"
              {...register("title", { required: "タイトルは必須です。" })}
              className="p-2 border rounded"
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}

            {/* 詳細 */}
            <textarea
              placeholder="タスクの詳細"
              {...register("description")}
              className="p-2 border rounded"
            />

            {/* 期限 */}
            <label>期限</label>
            <input
              type="date"
              {...register("due_date")}
              className="p-2 border rounded"
            />
            {errors.due_date && <span className="text-red-500 text-sm">{errors.due_date.message}</span>}

            {/* 状態 */}
            <label>状態</label>
            <select
              {...register("status", { valueAsNumber: true })}
              className="p-2 border rounded"
            >
              <option value={0}>未完了</option>
              <option value={1}>着手</option>
              <option value={2}>完了</option>
            </select>

            {/* ボタン */}
            <div className="flex gap-2">
              <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600">追加</button>
              <button type="button" onClick={closeModal} className="bg-gray-500 text-white py-2 px-4 rounded shadow hover:bg-gray-600">キャンセル</button>
            </div>
          </form>
        </div>
      </Modal>
      <button 
        onClick={openModal} 
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600">
        タスクを追加
      </button>
    </>
  );
}
