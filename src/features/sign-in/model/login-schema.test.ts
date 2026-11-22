import { describe, expect, it } from 'vitest';
import { loginSchema } from './login-schema';

describe('loginSchema', () => {
  it('обрезает внешние пробелы email и сохраняет пароль как введён', () => {
    expect(loginSchema.parse({ email: '  alexey@example.com  ', password: ' пароль ' })).toEqual({
      email: 'alexey@example.com',
      password: ' пароль ',
    });
  });

  it('показывает по одной ошибке для каждого незаполненного поля', () => {
    const result = loginSchema.safeParse({ email: '  ', password: '' });

    expect(result.error?.issues).toMatchObject([
      { path: ['email'], message: 'Введите email.' },
      { path: ['password'], message: 'Введите пароль.' },
    ]);
  });

  it('отличает неверный формат email от пустого значения', () => {
    const result = loginSchema.safeParse({ email: 'alexey.example.com', password: 'a' });

    expect(result.error?.issues).toMatchObject([
      { path: ['email'], message: 'Введите корректный email.' },
    ]);
  });
});
