import React, {
    useState,
    useEffect
} from 'react';
import axios from 'axios';
import persianJs from 'persianJs';

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
                    <h1>تمام محصولات {persianJs(data.total).englishNumber().toString()}</h1>
                    {data.category.map((item: any, i: any) => {
                        switch (item.name) {
                            case "rahati":
                                return (
                                    <li key={i} >
                                        <span>راحتی</span>
                                        {' '}
                                        <span>{persianJs(item.value).englishNumber().toString()}</span>
                                    </li>
                                )
                            case "rahatil":
                                return (
                                    <li key={i} >
                                        <span>راحتی ال</span>
                                        {' '}
                                        <span>{persianJs(item.value).englishNumber().toString()}</span>
                                    </li>
                                )
                            case "servicekhab":
                                return (
                                    <li key={i} >
                                        <span>سرویس خواب</span>
                                        {' '}
                                        <span>{persianJs(item.value).englishNumber().toString()}</span>
                                    </li>
                                )
                            case "naharkhori":
                                return (
                                    <li key={i} >
                                        <span>نهار خوری</span>
                                        {' '}
                                        <span>{persianJs(item.value).englishNumber().toString()}</span>
                                    </li>
                                )
                            case "console":
                                return (
                                    <li key={i} >
                                        <span>آینه کنسول</span>
                                        {' '}
                                        <span>{persianJs(item.value).englishNumber().toString()}</span>
                                    </li>
                                )
                            default:
                                return null
                        }
                    }
                    )}
                </ul>
                <h2>total views {data.totalView}</h2>
            </div>
        )
    } else {
        return null
    }

}

export default Overview