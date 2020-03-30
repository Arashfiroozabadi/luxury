import React, {
    useState,
    useEffect
} from 'react';
import axios from 'axios';

function Overview() {
    const [data, setData] = useState<any | null>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.post(
                'api/overview',
            );
            // if (result.data.auth === false) { setAuth(false) }
            setData(result.data.resualt);
        };
        fetchData();
    }, [])
    return (
        <div>
            <span>all</span>
            <h1>{data.length}</h1>
            <div>
                {data.map((item: any, index: any) => (
                    <li key={index} >{item.title}</li>
                ))}
            </div>
        </div>
    )
}

export default Overview