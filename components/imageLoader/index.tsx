import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import Loading from '../loading';

interface Props{
    alt:string
    postID:string
    className:string
    bannerPath:string
    loaderClassName: string
}

function ImageLoader({
  alt,
  postID,
  className,
  bannerPath,
  loaderClassName,
}:Props) {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await Axios.post(
          '/api/getimagebanner',
          {
            postID,
            bannerPath,
          },
        );
        setData(result.data);
      } catch {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => () => {
    console.log('cleaned up');
  }, []);

  if (isError) {
    console.log('cancle');
    return null;
  }
  if (isLoading) {
    return (
      <Loading className={loaderClassName} size={80} />
    );
  }
  return (
    <img
      className={className}
      src={`data:image/png;base64,${data}`}
      alt={alt}
    />
  );
}

export default ImageLoader;
