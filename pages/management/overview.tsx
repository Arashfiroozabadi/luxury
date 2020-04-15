
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import persianJs from 'persianjs';


import Chart from './chart';

function convertValue(v: number) {
  if (v === 0) {
    return 0;
  }
  return persianJs(v).englishNumber().toString();
}

function Overview() {
  const [data, setData] = useState<any | null>({});
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(
        'api/overview',
      );

      setData(result.data);
    };
    fetchData();
  }, []);

  if (data.category) {
    return (
      <div>
        <h1>
          تمام محصولات
          {convertValue(data.total)}
        </h1>
        <div
          style={{
            width: '100%',
          }}
        >
          <Chart
            data={data}
            array={data.category}
          />
        </div>
        <h2>
          میزان بازدید کلی
          {convertValue(data.totalView)}
        </h2>
      </div>
    );
  }
  return null;
}

export default Overview;
