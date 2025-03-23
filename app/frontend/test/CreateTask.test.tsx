import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import TodoApp from "../components/index.tsx";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(),
    })
  ) as jest.Mock;
});

describe("TodoApp", () => {
  test("タスクの作成ができるか", async () => {
    render(<TodoApp />);
    fireEvent.click(screen.getByText("タスクを追加"));
    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText("タスク名"), { target: { value: "New Task" } });
      fireEvent.change(screen.getByPlaceholderText("タスクの詳細"), { target: { value: "New Description" } });
      fireEvent.change(document.querySelector('input[name="due_date"]')!, { target: { value: "2023-12-31" } });
      fireEvent.change(screen.getByLabelText("状態"), { target: { value: 0 } });
    });
    expect(screen.getByText("追加")).toBeInTheDocument();
  });
});
