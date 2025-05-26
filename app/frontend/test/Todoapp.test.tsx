import { render, screen, waitFor, act } from '@testing-library/react';
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
  {
    id: 2,
    title: 'Test Task 2',
    description: 'Description 2',
    due_date: '2025-12-31',
    status: 'start',
    user_id: 1,
  },
];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockTasks),
    }),
  ) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('TodoApp', () => {
  test('fetchTasksが適切に呼ばれているか', async () => {
    const expectedTasks = [
      {
        id: 1,
        title: 'Test Task 1',
        description: 'Description 1',
        due_date: '2025-12-31',
        status: 'unfinished',
        user_id: 1,
      },
      {
        id: 2,
        title: 'Test Task 2',
        description: 'Description 2',
        due_date: '2025-12-31',
        status: 'start',
        user_id: 1,
      },
    ];
    await act(async () => {
      render(<TodoApp />);
      const response = await fetch('/api/tasks');
      const data = await response.json();
      expect(data).toEqual(expectedTasks);
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  test('作成されたタスクが表示されているか', async () => {
    render(<TodoApp />);
    await waitFor(() => {
      expect(screen.getByText('Test Task 1')).toBeInTheDocument();
      expect(screen.getByText('Test Task 2')).toBeInTheDocument();
    });
  });
});
