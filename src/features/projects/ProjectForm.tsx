import { useForm } from 'react-hook-form';
//react-hook-form → lightweight form state handling.
import { z } from 'zod';
//zod → schema validation.
import { zodResolver } from '@hookform/resolvers/zod';
//zodResolver → integrates zod with react-hook-form.
import { useMutation, useQueryClient } from '@tanstack/react-query';
//useMutation + useQueryClient from React Query → send create/update requests, then refresh cache.

import { createProject, updateProject, getProject } from './api';
//createProject, updateProject, getProject → backend CRUD functions.
import { useNavigate, useParams } from 'react-router-dom';
//useParams → read id from URL (to check if editing).
//useNavigate → redirect after saving.
import { useEffect } from 'react';

const schema = z.object({ name: z.string().min(2), description: z.string().optional() });
type FormValues = z.infer<typeof schema>;

export default function ProjectForm() {
  const { id } = useParams();
  //Reads the id param from route.
  //If id exists and isn’t "new", this is an edit form; otherwise, it’s a create form.
  const isEdit = Boolean(id && id !== 'new');
  const navigate = useNavigate();
  const qc = useQueryClient();
  //Hooking up the form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  //useForm sets up form handling.
  //register → ties inputs to form state.
  //reset → resets form with new values (used when editing).
  //Uses zodResolver to enforce schema validation.

  useEffect(() => {
    (async () => {
      if (isEdit && id) {
        const p = await getProject(id);
        reset({ name: p.name, description: p.description });
      }
    })();
  }, [id, isEdit, reset]);
  //If editing (isEdit true):
  //Fetch the project by id.
  //Pre-fill the form with its data using reset.

  const createMut = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects'] });
      navigate('/projects');
    },
  });
  const updateMut = useMutation({
    mutationFn: ({ id, body }: { id: string; body: FormValues }) => updateProject(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects'] });
      navigate('/projects');
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (isEdit && id) await updateMut.mutateAsync({ id, body: values });
    else await createMut.mutateAsync(values);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">{isEdit ? 'Edit Project' : 'New Project'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input className="w-full border p-2 rounded" {...register('name')} />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea className="w-full border p-2 rounded" rows={4} {...register('description')} />
        </div>
        <button disabled={isSubmitting} className="px-4 py-2 rounded bg-blue-600 text-white">
          {isEdit ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
}
