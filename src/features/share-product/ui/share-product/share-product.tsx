'use client';

import { Share2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/shared/ui';
import styles from './share-product.module.css';

export function ShareProduct({ href }: { href: string }) {
  const [result, setResult] = useState<'idle' | 'copied' | 'offer-copy' | 'manual'>('idle');
  const [url, setUrl] = useState('');
  async function copy(address: string) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(address);
      setResult('copied');
    } catch {
      setResult('manual');
    }
  }
  async function share() {
    const address = new URL(href, window.location.origin).href;
    setUrl(address);
    setResult('idle');
    if (!navigator.share) {
      await copy(address);
      return;
    }
    try {
      await navigator.share({ url: address });
    } catch (error) {
      if (!(error instanceof Error && error.name === 'AbortError')) setResult('offer-copy');
    }
  }
  return (
    <div className={styles.root}>
      <Button
        variant="ghost"
        size="icon"
        className={styles.share}
        onClick={share}
        aria-label="Поделиться товаром"
      >
        <Share2 aria-hidden />
      </Button>
      {result !== 'idle' ? (
        <div className={styles.message} role="status">
          {result === 'copied' ? 'Ссылка скопирована' : null}
          {result === 'offer-copy' ? (
            <Button variant="link" onClick={() => void copy(url)}>
              Скопировать ссылку
            </Button>
          ) : null}
          {result === 'manual' ? (
            <>
              <span>Скопируйте ссылку вручную:</span>
              <input
                aria-label="Ссылка на товар"
                readOnly
                value={url}
                onFocus={(event) => event.currentTarget.select()}
              />
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
