import React, {
    useState,
    useEffect
} from 'react';
import axios from 'axios';
import persianJs from 'persianJs';


import ConverString from '../../components/ConverString';

function converValue(v: any) {
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
    console.log(data);
    if (data.category) {
        return (
            <div>
                <ul>
                    <h1>تمام محصولات {converValue(data.total)}</h1>
                    {data.category.map((item: any, i: any) => (
                        <li key={i} >
                            <span>{ConverString(item.name)}</span>
                            {' '}
                            <span>{converValue(item.value)}</span>
                        </li>
                    ))}
                </ul>
                <h2>میزان بازدید کلی {converValue(data.totalView)}</h2>
            </div>
        )
    } else {
        return null
    }

}

export default Overview