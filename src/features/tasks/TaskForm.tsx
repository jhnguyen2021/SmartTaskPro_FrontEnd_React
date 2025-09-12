import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from './api';

const schema = z.object({ title: z.string().min(2) });
type FormValues = z.infer<typeof schema>;

export default function TaskForm() {
  const qc = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const add = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks'] });
      reset({ title: '' });
    },
  });

  const onSubmit = async (values: FormValues) => {
    await add.mutateAsync({ title: values.title, done: false });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-2">
      <div className="flex-1">
        <input
          className="w-full border p-2 rounded"
          placeholder="New task..."
          {...register('title')}
        />
        {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
      </div>
      <button disabled={isSubmitting} className="px-3 py-2 rounded bg-blue-600 text-white">
        Add
      </button>
    </form>
  );
}
