import { useEffect, useMemo, useState } from "react";

export interface UseAsyncEffect<T> {
  pending: boolean;
  result?: T;
  error?: unknown;
}

export function useAsyncEffect<T>(
  effect: () => Promise<T>,
  dependencies: unknown[]
): UseAsyncEffect<T> {
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(undefined);
  const [result, setResult] = useState<T | undefined>(undefined);
  useEffect(() => {
    setPending(true);
    effect()
      .then(setResult, setError)
      .finally(() => setPending(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  const state = useMemo(
    () => ({
      pending,
      result,
      error,
    }),
    [error, pending, result]
  );
  return state;
}
