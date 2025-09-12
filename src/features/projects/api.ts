import api from '../../lib/axios';
import type { Project } from './types';

export async function listProjects(): Promise<Project[]> {
  const { data } = await api.get<Project[]>('/projects');
  return data;
}
export async function getProject(id: string): Promise<Project> {
  const { data } = await api.get<Project>(`/projects/${id}`);
  return data;
}
export async function createProject(body: Partial<Project>): Promise<Project> {
  const { data } = await api.post<Project>('/projects', body);
  return data;
}
export async function updateProject(id: string, body: Partial<Project>): Promise<Project> {
  const { data } = await api.patch<Project>(`/projects/${id}`, body);
  return data;
}
export async function deleteProject(id: string): Promise<void> {
  await api.delete(`/projects/${id}`);
}
