import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { MockApiError, requestMock } from '@/shared/api';
import { loginSchema } from './login-schema';

export function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginSchema),
  });
  const login = useMutation({
    mutationFn: async () => {
      await requestMock('/session/login', { method: 'POST' });
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
