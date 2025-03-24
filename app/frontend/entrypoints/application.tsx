import "@hotwired/turbo-rails";
import { createRoot } from "react-dom/client";
import TodoApp from "../components/index";

document.addEventListener("turbo:load", () => {
  const todo_app = document.getElementById("todo_app");
  if (todo_app) {
    createRoot(todo_app).render(<TodoApp />);
  }
});
