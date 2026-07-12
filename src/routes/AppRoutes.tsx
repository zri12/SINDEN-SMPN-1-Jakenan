import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { ROUTES } from "@/constants/routes";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";
import { LoginPage } from "@/features/auth/LoginPage";
import { getCurrentUser } from "@/features/auth/authService";
import { adminRoutes } from "./adminRoutes";
import { teacherRoutes } from "./teacherRoutes";
import { studentRoutes } from "./studentRoutes";

const dashboardByRole = {
  admin: ROUTES.admin.dashboard,
  teacher: ROUTES.teacher.dashboard,
  student: ROUTES.student.dashboard
};

function RootRedirect() {
  const user = getCurrentUser();
  return <Navigate to={user ? dashboardByRole[user.role] : ROUTES.login} replace />;
}

function SimpleStatePage({ title, message }: { title: string; message: string }) {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const target = user ? dashboardByRole[user.role] : ROUTES.login;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <Card className="max-w-md text-center">
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-500">{message}</p>
        <Button className="mt-5" onClick={() => navigate(target, { replace: true })}>
          Kembali
        </Button>
      </Card>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.root} element={<RootRedirect />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.unauthorized} element={<SimpleStatePage title="Akses Tidak Diizinkan" message="Anda tidak memiliki izin untuk membuka halaman ini." />} />

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        {adminRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
        {teacherRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        {studentRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route path="*" element={<SimpleStatePage title="Halaman Tidak Ditemukan" message="Halaman yang Anda cari tidak tersedia." />} />
    </Routes>
  );
}
