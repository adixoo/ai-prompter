'use client';

import { useCallback, useState } from 'react';

export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
}: {
  timeout?: number;
  onCopy?: () => void;
} = {}) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(
    (value: string) => {
      if (!navigator?.clipboard) {
        console.error('Clipboard API is not available');
        return;
      }

      navigator.clipboard.writeText(value).then(
        () => {
          setIsCopied(true);
          onCopy?.();

          setTimeout(() => {
            setIsCopied(false);
          }, timeout);
        },
        error => {
          console.error('Failed to copy text: ', error);
        }
      );
    },
    [onCopy, timeout]
  );

  return { isCopied, copyToClipboard };
}
