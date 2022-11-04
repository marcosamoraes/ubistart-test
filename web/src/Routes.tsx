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

import { Login as AdminLogin } from "./pages/admin/auth/login";
import { Register as AdminRegister } from "./pages/admin/auth/register";
import { TodoList as AdminTodoList } from "./pages/admin/todo/list";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo/list" element={<TodoList />} />
        <Route path="/todo/add" element={<TodoAdd />} />
        <Route path="/todo/edit/:id/:description/:deadline" element={<TodoEdit />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/todo/list" element={<AdminTodoList />} />
      </Routes>
    </Router>
  )
}