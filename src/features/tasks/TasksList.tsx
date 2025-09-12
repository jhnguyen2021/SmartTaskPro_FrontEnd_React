import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listTasks, deleteTask, updateTask } from './api'
import Loader from '../../components/layout/common/Loader'
import TaskForm from './TaskForm'

export default function TasksList() {
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['tasks'], queryFn: listTasks })
  const del = useMutation({ mutationFn: deleteTask, onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }) })
  const toggle = useMutation({
    mutationFn: ({ id, done }: { id: string; done: boolean }) => updateTask(id, { done }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  })

  if (isLoading) return <Loader />

  return (
    <div className="p-6 space-y-6">
      <TaskForm />
      <ul className="space-y-2">
        {data?.map(t => (
          <li key={t.id} className="flex items-center justify-between border rounded p-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={t.done} onChange={() => toggle.mutate({ id: t.id, done: !t.done })} />
              <span className={t.done ? 'line-through text-gray-500' : ''}>{t.title}</span>
            </label>
            <button onClick={() => del.mutate(t.id)} className="text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
