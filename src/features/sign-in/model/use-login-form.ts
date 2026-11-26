import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { MockApiError, requestMock } from '@/shared/api';
import { saveSessionToken, sessionSchema, useSessionStore } from '@/entities/user';
import { loginSchema } from './login-schema';
import { useRouter } from 'next/navigation';

export function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginSchema),
  });
  const setSession = useSessionStore((state) => state.setSession);
  const router = useRouter();
  const login = useMutation({
    mutationFn: async () => {
      const response = await requestMock('/session/login', { method: 'POST' });
      return sessionSchema.parse(await response.json());
    },
    onSuccess: (session) => {
      saveSessionToken(session.token);
      setSession(session);
      router.replace('/');
    },
  });

  let requestError;
  if (login.isError) {
    requestError =
      login.error instanceof MockApiError
        ? 'Не удалось выполнить вход. Попробуйте ещё раз.'
        : 'Не удалось связаться с сервером. Проверьте подключение и попробуйте ещё раз.';
  }

  return {
    register,
    errors,
    onSubmit: handleSubmit(() => login.mutate(), login.reset),
    isPending: login.isPending,
    isSuccess: login.isSuccess,
    requestError,
  };
}
