export interface Task {
  id: bigint;
  title: string;
  description: string;
  due_date: Date;
  status: number;
  user_id: bigint;
}
