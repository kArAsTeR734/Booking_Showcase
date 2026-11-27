'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useRouteTransition } from '@/shared/routing';
export function CatalogLink({
  href,
  ...props
}: Omit<ComponentProps<typeof Link>, 'href'> & { href: string }) {
  const { navigate } = useRouteTransition();
  return (
    <Link
      {...props}
      href={href}
      prefetch={false}
      onNavigate={(event) => {
        event.preventDefault();
        navigate(href);
      }}
    />
  );
}
