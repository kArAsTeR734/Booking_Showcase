import { MountainSnow } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './auth-intro.module.css';

export function AuthIntro() {
  return (
    <aside className={styles.intro} aria-labelledby="auth-intro-title">
      <Image
        src="/images/rental-equipment.png"
        alt=""
        fill
        sizes="(min-width: 960px) 49vw, 100vw"
        loading="eager"
        className={styles.image}
      />
      <Link href="/" className={styles.brand}>
        <MountainSnow size={26} aria-hidden className={styles.brandIcon} />
        Северный прокат
      </Link>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Перед бронированием</p>
        <p id="auth-intro-title" className={styles.title}>
          Один вход — и бронь появится в истории
        </p>
        <p className={styles.description}>
          Безопасно продолжайте с теми же датами, позициями и итоговой суммой.
        </p>
      </div>
    </aside>
  );
}
