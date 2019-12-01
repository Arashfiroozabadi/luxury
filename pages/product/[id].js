import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
// import { useSelector } from 'react-redux'
import axios from 'axios';

export default function Post() {
  // const data = useSelector(state => state.data)
  const [res, setRes] = useState([]);
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(
        '/api/product',
        {
          target: id
        }
      );
      setRes(result.data);
    };
    fetchData();
  }, []);
  console.log(res);

  return (
    < Layout >
      <h1>{res.title}</h1>
      <p>{res.description}</p>
    </Layout >
  );
}