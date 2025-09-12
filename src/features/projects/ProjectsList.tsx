import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
//useQuery – fetches and caches data (listProjects).
//useMutation – handles actions that change data (deleteProject).
//useQueryClient – gives access to the query cache so you can invalidate or refetch queries.

import { listProjects, deleteProject } from './api';
import { Link } from 'react-router-dom';
import Loader from '../../components/layout/common/Loader';

export default function ProjectsList() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['projects'], queryFn: listProjects });
  //Calls the projects list API with useQuery.
  //queryKey: ['projects'] uniquely identifies this data in the cache.
  //queryFn: listProjects is the function that fetches projects.
  //Returns data (the list of projects) and isLoading (loading state).
  const del = useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
  //Creates a mutation for deleting a project by ID.
  //mutationFn = API call to delete.
  //onSuccess → invalidates the 'projects' query, so React Query will refetch the projects list automatically (keeps UI in sync).

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Link to="/projects/new" className="px-3 py-2 rounded bg-blue-600 text-white">
          New Project
        </Link>
      </div>
      <ul className="space-y-2">
        {data?.map((p) => (
          <li key={p.id} className="flex items-center justify-between border rounded p-3">
            <Link to={`/projects/${p.id}`} className="font-medium hover:underline">
              {p.name}
            </Link>
            <button onClick={() => del.mutate(p.id)} className="text-red-600">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
