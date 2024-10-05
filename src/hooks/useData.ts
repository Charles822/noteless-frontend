import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { axiosInstance } from '../services/api-client';

const useData = <T>(endpoint: string, method: 'get' | 'post' | 'patch' | 'delete', requestData?: any, requestConfig?: AxiosRequestConfig, deps?: any[] = []) => {
  const [data, setData] = useState<T | T[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const execute = async (requestData?: any) => {
    setLoading(true);
    try {
      const response = await axiosInstance({
        url: endpoint,
        method,
        data: requestData,
        ...requestConfig
      });
      setData(response.data);
      return response.data; // Return data on success
    } catch (err) {
      let errorMessage = 'An unexpected error occurred';
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.error || err.message || errorMessage;
      }
      setError(errorMessage);
      console.error('Error fetching data:', errorMessage);
      throw new Error(errorMessage); // Throw error to handle in onSubmit
  } finally {
    setLoading(false);
    }
  };

  return { data, error, isLoading, execute };
};

export default useData;