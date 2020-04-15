import React, {
    useState,
    useEffect
} from 'react';
import axios from 'axios';
import persianJs from 'persianJs';


import ConvertString from '../../components/ConvertString';
import Chart from './test';

function convertValue(v: any) {
    if (v === 0) {
        return 0
    } else {
        return persianJs(v).englishNumber().toString()
    }
}

function Overview() {
    const [data, setData] = useState<any | null>({});
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.post(
                'api/overview',
            );
            // if (result.data.auth === false) { setAuth(false) }
            setData(result.data);
        };
        fetchData();
    }, [])

    if (data.category) {
        return (
            <div>
                <ul>
                    <h1>تمام محصولات {convertValue(data.total)}</h1>
                    {data.category.map((item: any, i: any) => (
                        <li key={i} >
                            <span>{ConvertString(item.name)}</span>
                            {' '}
                            <span>{convertValue(item.value)}</span>
                        </li>
                    ))}
                </ul>
                <h2>میزان بازدید کلی {convertValue(data.totalView)}</h2>
                <div
                    style={{
                        width: '100%'
                    }}
                >
                    <Chart
                        total={data.total}
                        array={data.category}
                    />
                </div>
            </div>
        )
    } else {
        return null
    }

}

export default Overview