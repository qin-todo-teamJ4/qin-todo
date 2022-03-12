import axios from "axios";

export const useRequest = () => {
  const getRequest = async <T>(path: string): Promise<T | void> => {
    try {
      const { data } = await axios.get<T>(path);
      return data;
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const postRequest = async <T, U>(
    path: string,
    body: T
  ): Promise<U | void> => {
    try {
      const { data } = await axios.post<U>(path, body);
      return data;
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const deleteRequest = async <T>(path: string): Promise<T | void> => {
    try {
      const { data } = await axios.delete<T>(path);
      return data;
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return { getRequest, postRequest, deleteRequest };
};
