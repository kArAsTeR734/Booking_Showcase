import { useSyncExternalStore } from 'react';

// Match the breakpoint that collapses the form in catalog-filter-form.module.css.
const collapsedLayout = '(max-width: 820px)';

function subscribeToViewport(callback: () => void) {
  const media = window.matchMedia(collapsedLayout);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function isDesktop() {
  return !window.matchMedia(collapsedLayout).matches;
}

function getServerSnapshot() {
  return false;
}

export function useCatalogFiltersVisibility(expanded: boolean) {
  const desktop = useSyncExternalStore(subscribeToViewport, isDesktop, getServerSnapshot);
  return desktop || expanded;
}
