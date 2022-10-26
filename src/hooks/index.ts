import { useRef } from 'react';

export function useIsFirstRender(): boolean {
  const isFirst = useRef(true);
  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }
  return false;
}

export function useIsFirstRenderRef() {
  const isFirst = useIsFirstRender();
  const ref = useRef(isFirst);
  ref.current = isFirst;
  return ref;
}
