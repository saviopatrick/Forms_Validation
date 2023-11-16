'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const createUserFormSchema = z.object({
  email: z.string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  password: z.string()
    .min(6, 'A senha precisa ter no mínimo 6 caracteres'),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export default function Home() {
  const [output, setOutput] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  function createUser(data: CreateUserFormData) {
    setOutput(JSON.stringify(data, null, 2));
  
    reset();
  }

  return (
    <main className="h-screen bg-zinc-950 flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(createUser)
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="">E-mail</label>
          <input
            type="email"
            className={`border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white ${errors.email ? 'border-red-500' : ''}`}
            {...register('email')}
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="">Senha</label>
          <input
            type="password"
            className={`border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white ${errors.password ? 'border-red-500' : ''}`}
            {...register('password')}
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>

        <button type="submit" className='bg-emerald-500 font-semibold text-white h-10 hover:bg-emerald-500'>Salvar</button>
      </form>

      {output && (
        <div className="mt-4 text-green-500">
          Formulário enviado com sucesso!
        </div>
      )}
    
    </main>
  );
}
