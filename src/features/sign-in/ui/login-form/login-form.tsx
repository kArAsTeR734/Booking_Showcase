'use client';

import { Eye, EyeOff, LockKeyhole, LogIn, Mail } from 'lucide-react';
import { useState } from 'react';
import { Button, TextField } from '@/shared/ui';
import { useLoginForm } from '../../model/use-login-form';
import styles from './login-form.module.css';

export function LoginForm() {
  const { register, errors, onSubmit, isPending, isSuccess, requestError } = useLoginForm();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const PasswordIcon = isPasswordVisible ? EyeOff : Eye;

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <TextField
        {...register('email')}
        id="login-email"
        label="Email"
        type="email"
        inputMode="email"
        autoComplete="username"
        autoCapitalize="none"
        spellCheck={false}
        required
        icon={<Mail size={16} />}
        error={errors.email?.message}
      />
      <TextField
        {...register('password')}
        id="login-password"
        label="Пароль"
        type={isPasswordVisible ? 'text' : 'password'}
        autoComplete="current-password"
        autoCapitalize="none"
        spellCheck={false}
        required
        icon={<LockKeyhole size={16} />}
        error={errors.password?.message}
        endAdornment={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={styles.passwordToggle}
            aria-controls="login-password"
            aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
            onClick={() => setPasswordVisible(!isPasswordVisible)}
          >
            <PasswordIcon size={16} aria-hidden />
          </Button>
        }
      />
      <Button type="submit" disabled={isPending}>
        <LogIn size={16} aria-hidden />
        {isPending ? 'Входим…' : 'Войти и продолжить'}
      </Button>
      {isSuccess && <p role="status">Вход выполнен.</p>}
      {requestError && (
        <p className={styles.requestError} role="alert">
          {requestError}
        </p>
      )}
    </form>
  );
}
