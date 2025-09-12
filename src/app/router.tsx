import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import TopNav from '../components/layout/TopNav';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import ProjectsList from '../features/projects/ProjectsList';
import ProjectForm from '../features/projects/ProjectForm';
import ProjectDetails from '../features/projects/ProjectDetails';
import TasksList from '../features/tasks/TasksList';
//import { useAuth } from '../context/useAuth';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="max-w-5xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

// function ProtectedRoute() {
//   const { user } = useAuth();
//   if (!user) return <Navigate to="/login" replace />;
//   return <Outlet />;
// }

// ⬇️ no export here
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        //element: <ProtectedRoute />,
        children: [
          { path: 'projects', element: <ProjectsList /> },
          { path: 'projects/new', element: <ProjectForm /> },
          { path: 'projects/:id', element: <ProjectDetails /> },
          { path: 'projects/:id/edit', element: <ProjectForm /> },
          { path: 'tasks', element: <TasksList /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
