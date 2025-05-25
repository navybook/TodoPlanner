import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import TodoApp from '../components/index.tsx';
import { Task } from '../types/index.ts';

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Test Task 1',
    description: 'Description 1',
    due_date: '2025-12-31',
    status: 'unfinished',
    user_id: 1,
  },
];

beforeEach(async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockTasks),
    }),
  ) as jest.Mock;
  await act(async () => {
    render(<TodoApp />);
  });
});

describe('TodoApp', () => {
  test('タスクのタイトルを編集できるか', async () => {
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Test Task 1'));
    fireEvent.change(screen.getByDisplayValue('Test Task 1'), {
      target: { value: 'Updated Task 1' },
    });
    await waitFor(() => {
      expect(screen.getByText('更新')).toBeInTheDocument();
    });
  });

  test('タスクを削除できるか', async () => {
    fireEvent.click(screen.getByText('Test Task 1'));
    await waitFor(() => {
      expect(screen.getByText('削除')).toBeInTheDocument();
    });
  });
});
