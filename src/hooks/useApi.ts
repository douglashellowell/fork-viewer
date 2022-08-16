import { useState } from 'react';

const API = `http://api.github.com`;

/**
 * 
 * @param endpoint - must start with a forward slash
 * @param initialState - is used in a setState
 * @example
 * ```ts
 * const {
    apiData: dogs,
    fetchFromApi: fetchDogs,
    isErrored,
    isLoading,
  } = useApi<Dogs[]>('/dogs', [])
 * ```
 */
function useApi<ApiData>(initialState: ApiData) {
  const [isLoading, setIsLoading] = useState(true);
  const [isErrored, setIsErrored] = useState(false);
  const [apiData, setApiData] = useState<ApiData>(initialState);

  const fetchFromApi = async (endpoint: string) => {
    setIsLoading(true);
    setIsErrored(false);
    try {
      const r = await fetch(`${API}${endpoint}`);
      const data = await r.json();
      setIsLoading(false);
      setApiData(data);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setIsErrored(true);
    }
  };

  return {
    isLoading,
    isErrored,
    apiData,
    fetchFromApi,
  };
}

export default useApi;
