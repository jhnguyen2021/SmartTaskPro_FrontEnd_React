export type Task = {
  id: string;
  projectId?: string;
  title: string;
  done: boolean;
  dueDate?: string;
};
