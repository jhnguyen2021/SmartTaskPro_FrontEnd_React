import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProject } from './api';
import Loader from '../../components/layout/common/Loader';

export default function ProjectDetails() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => getProject(id!),
    enabled: !!id,
  });

  if (isLoading) return <Loader />;
  if (!data) return <div className="p-6">Not found.</div>;

  return (
    <div className="p-6 space-y-3">
      <h1 className="text-2xl font-semibold">{data.name}</h1>
      {data.description && <p className="text-gray-700">{data.description}</p>}
      <Link to={`/projects/${id}/edit`} className="px-3 py-2 rounded bg-gray-800 text-white">
        Edit
      </Link>
    </div>
  );
}
