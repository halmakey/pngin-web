import { useCallback, useState } from "react";

export function useAsyncCallback<A extends Array<unknown>, T>(
  generator: (...args: A) => Promise<T>,
  dependencies: unknown[]
) {
  const [pending, setPending] = useState(false);

  const call = useCallback<(...args: A) => Promise<T>>(
    async (...args: A) => {
      setPending(true);
      try {
        return await generator(...args);
      } finally {
        setPending(false);
      }
    },
    // Reason: Behave like useCallback
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  );

  return {
    pending,
    call,
  };
}
