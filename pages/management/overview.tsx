import React, {
    useState,
    useEffect
} from 'react';
import axios from 'axios';


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
                    <h1>total products {data.total}</h1>
                    {data.category.map((item: any, i: any) => (
                        <li key={i} >
                            <span>{item.name}</span>
                            {' '}
                            <span>{item.value}</span>
                        </li>
                    ))}
                </ul>
                <h2>total views {data.totalView}</h2>
            </div>
        )
    } else {
        return null
    }

}

export default Overview