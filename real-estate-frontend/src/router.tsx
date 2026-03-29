import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./components/pages/Register";
import { Login } from "./components/pages/login";
import { ProtectedRoute } from "./components/pages/ProtectedRoute/protectedRoute";
import Dashboard from "./components/pages/ProtectedRoute/dashboard";
import DashboardLayout from "./components/common/DashboardLayout";
import { Favourite } from "./components/pages/ProtectedRoute/Favourite";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/property" element={<Dashboard />} />
            <Route path="/favourite" element={<Favourite />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
