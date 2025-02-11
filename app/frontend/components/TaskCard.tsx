import { Task } from "../types"
import Modal from "./ui/Modal";
import useModal from "../hooks/useModal";

interface TaskCardProps {
  task: Task;
}

export default function ShowTask({
  task,
} : TaskCardProps) {
  const { modalRef, openModal } = useModal();
  return (
    <div>
      <div className="rounded border border-gray-200 bg-white hover:bg-blue-200">
        <div className="relative flex min-h-[80px] flex-col">
          <div className="link m-2 mr-10 break-words text-sm"onClick={openModal}>{task.title}</div>
        </div>
      </div>
      <Modal modalRef={modalRef}>
        <div className="flex">
          <h3 className="my-2 flex-1 border-b border-gray-300 text-3xl font-bold">
            タスク詳細
          </h3>
        </div>
        <div className="mb-2 text-lg">タイトル</div>
        <div className="rounded-lg border border-solid border-gray-300">
          <div className="m-2 mx-4">{task.title}</div>
        </div>
        <div className="mb-2 text-lg">詳細</div>
        <div className="rounded-lg border border-solid border-gray-300 pb-8 text-sm">
          <div className="m-2 mx-4">{task.description}</div>
        </div>
        <div className="mb-2 text-lg">期限</div>
        <div className="rounded-lg border border-solid border-gray-300 text-sm">
          <div className="m-2 mx-4">{task.due_date}</div>
        </div>
        <div className="mb-2 text-lg">状態</div>
        <div className="rounded-lg border border-solid border-gray-300 text-sm">
          <div className="m-2 mx-4">{task.status}</div>
        </div>
      </Modal>
    </div>
  );
}
