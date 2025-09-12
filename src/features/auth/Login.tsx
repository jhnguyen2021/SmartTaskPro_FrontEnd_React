import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
//bridges Zod with React Hook Form.
import { useAuth } from '../../context/useAuth';
//bridges Zod with React Hook Form.

const schema = z.object({
  //Defines a Zod schema for login:
  email: z.string().email(),
  password: z.string().min(6),
  // email must be a valid email string.
  //password must be at least 6 characters.
});
type FormValues = z.infer<typeof schema>;

export default function Login() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    await login(values);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="w-full border p-2 rounded" {...register('email')} />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" className="w-full border p-2 rounded" {...register('password')} />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        </div>
        <button
          disabled={isSubmitting}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
        >
          {isSubmitting ? 'Logging in…' : 'Login'}
        </button>
      </form>
    </div>
  );
}
