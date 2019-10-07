import React, {
    useState,
    useEffect
} from 'react';
import axios from 'axios';
import Layout from "../components/Layout";

function CallUS() {
    const [resp, setResp] = useState<any | null>([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                '/api/all',
            );
            setResp(result.data);
        };
        fetchData();
    }, []);
    return (
        <Layout>
            <h1>
                تماس با ما
            </h1>
            {resp ?
                resp.map((d: any, index: any) => (
                    <img
                        key={index}
                        src={d.path ? d.path : null}
                        height={200}
                        width={200}
                    />
                )) :
                null
            }
        </Layout>
    )
}

export default CallUS;