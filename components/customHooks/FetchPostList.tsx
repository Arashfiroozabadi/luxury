import { useState, useEffect } from 'react';
import Axios from 'axios';

const FetchPostList = (query:string, refresh:boolean) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await Axios.get(`/api/all/?${query}`);
        setData(result.data);
      } catch {
        setData([]);
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();

    return (() => {
      console.log('cleaned up');
      abortController.abort();
    });
  }, [query, refresh]);

  return { data, isError, isLoading };
};


export default FetchPostList;
