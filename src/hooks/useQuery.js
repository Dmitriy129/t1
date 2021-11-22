import { useCallback, useEffect, useState } from "react";

export const useQuery = (query, data) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendQuery = useCallback(() => {
    setLoading(true);
    return query(data)
      .then(setResult)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [query, data]);

  useEffect(() => {
    sendQuery();
    return () => {};
  }, [data]);

  return {
    data: result,
    error,
    loading,
    refresh: sendQuery,
  };
};
