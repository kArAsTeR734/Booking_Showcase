'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useRouteTransition } from '@/shared/routing';
export function CatalogLink({
  href,
  onClick,
  ...props
}: Omit<ComponentProps<typeof Link>, 'href'> & { href: string }) {
  const { navigate, pending } = useRouteTransition();
  return (
    <Link
      {...props}
      href={href}
      prefetch={false}
      aria-disabled={pending || undefined}
      onClick={(event) => {
        if (pending) event.preventDefault();
        else onClick?.(event);
      }}
      onNavigate={(event) => {
        event.preventDefault();
        if (!pending) navigate(href);
      }}
    />
  );
}
