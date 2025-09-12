import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="p-6 space-y-3">
      <h1 className="text-2xl font-semibold">404 - Not Found</h1>
      <Link to="/" className="text-blue-600 hover:underline">
        Go home
      </Link>
    </div>
  );
}
