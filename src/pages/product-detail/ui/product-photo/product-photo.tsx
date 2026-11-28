'use client';

import Image from 'next/image';
import { useState } from 'react';
import { StatusBadge } from '@/shared/ui';
import styles from './product-photo.module.css';

export function ProductPhoto({
  name,
  imageSrc,
  available,
}: {
  name: string;
  imageSrc: string;
  available: boolean;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <div className={styles.photo}>
      {imageFailed ? (
        <div className={styles.placeholder} role="img" aria-label="Изображение товара недоступно">
          Изображение недоступно
        </div>
      ) : (
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(max-width: 820px) 100vw, 55vw"
          priority
          onError={() => setImageFailed(true)}
        />
      )}
      <div className={styles.photoStatus}>
        <StatusBadge variant={available ? 'available' : 'unavailable'}>
          {available ? 'Доступно' : 'Недоступно'}
        </StatusBadge>
      </div>
    </div>
  );
}
