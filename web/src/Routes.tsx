import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { TodoList } from "./pages/todo/list";
import { TodoAdd } from "./pages/todo/add";
import { TodoEdit } from "./pages/todo/edit";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo/list" element={<TodoList />} />
        <Route path="/todo/add" element={<TodoAdd />} />
        <Route path="/todo/edit" element={<TodoEdit />} />
      </Routes>
    </Router>
  )
}