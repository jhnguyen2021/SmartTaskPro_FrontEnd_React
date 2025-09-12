import api from '../../lib/axios';
import type { Task } from './types';

export async function listTasks(): Promise<Task[]> {
  const { data } = await api.get<Task[]>('/tasks');
  return data;
}
export async function createTask(body: Partial<Task>): Promise<Task> {
  const { data } = await api.post<Task>('/tasks', body);
  return data;
}
export async function updateTask(id: string, body: Partial<Task>): Promise<Task> {
  const { data } = await api.patch<Task>(`/tasks/${id}`, body);
  return data;
}
export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`);
}
