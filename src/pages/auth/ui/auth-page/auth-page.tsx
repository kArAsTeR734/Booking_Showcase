import { LoginForm } from '@/features/sign-in';
import styles from './auth-page.module.css';

export function AuthPage() {
  return (
    <main className={styles.page}>
      <section className={styles.content} aria-labelledby="auth-title">
        <header className={styles.header}>
          <p className={styles.eyebrow}>Шаг перед оформлением</p>
          <h1 id="auth-title">Войдите в аккаунт</h1>
          <p className={styles.description}>История броней доступна только после входа.</p>
        </header>
        <LoginForm />
      </section>
    </main>
  );
}
