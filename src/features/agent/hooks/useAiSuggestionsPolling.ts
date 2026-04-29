import { useEffect, useState } from "react";

interface UseAiSuggestionsPollingOptions {
  suggestionsCount: number;
  isFetching: boolean;
  isError: boolean;
  refetch: () => void;
  pollingIntervalMs?: number;
  enabled?: boolean;
}

export const useAiSuggestionsPolling = ({
  suggestionsCount,
  isFetching,
  isError,
  refetch,
  pollingIntervalMs = 2500,
  enabled = true,
}: UseAiSuggestionsPollingOptions) => {
  const [isWaitingForSuggestions, setIsWaitingForSuggestions] = useState(true);

  useEffect(() => {
    if (!enabled) {
      setIsWaitingForSuggestions(false);
      return;
    }

    if (isError) {
      setIsWaitingForSuggestions(false);
      return;
    }

    if (suggestionsCount > 0) {
      setIsWaitingForSuggestions(false);
      return;
    }

    setIsWaitingForSuggestions(true);
  }, [enabled, isError, suggestionsCount]);

  useEffect(() => {
    if (!enabled || !isWaitingForSuggestions || isError) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (!isFetching) {
        refetch();
      }
    }, pollingIntervalMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [enabled, isWaitingForSuggestions, isError, isFetching, pollingIntervalMs, refetch]);

  return { isWaitingForSuggestions };
};
