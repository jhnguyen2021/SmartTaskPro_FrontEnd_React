import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

export default function TopNav() {
  const { user, logout } = useAuth();
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-semibold">
          SmartTaskPro
        </Link>
        <Link to="/projects" className="hover:underline">
          Projects
        </Link>
        <Link to="/tasks" className="hover:underline">
          Tasks
        </Link>
      </div>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm">Hi, {user.name || user.email}</span>
            <button onClick={logout} className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500">
              Login
            </Link>
            <Link to="/register" className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
