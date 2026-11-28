'use client';

import Link, { useLinkStatus } from 'next/link';
import type { ReactNode } from 'react';

function Pending() {
  const { pending } = useLinkStatus();
  return <span role="status">{pending ? ' Загрузка…' : ''}</span>;
}
export function ProductCardLink({
  href,
  className,
  children,
  catalog,
}: {
  href: string;
  className: string;
  children: ReactNode;
  catalog: boolean;
}) {
  return (
    <Link
      href={href}
      className={className}
      onNavigate={() => {
        if (!catalog) return;
        try {
          sessionStorage.setItem(
            'product-navigation',
            JSON.stringify({
              target: href,
              source: window.location.pathname + window.location.search,
            }),
          );
        } catch {
          /* The fallback is the catalog link. */
        }
      }}
    >
      {children}
      <Pending />
    </Link>
  );
}
