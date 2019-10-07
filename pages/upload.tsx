import React, {
    useState,
    useEffect
} from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

function Upload() {
    const [data, setData] = useState<any | null>({});
    const [form, setForm] = useState<any | null>({
        userName: '',
        pass: '',
        msg: ""
    });
    const [isAuth, setAuth] = useState()
    useEffect(() => {
        console.log('ok');
        const fetchData = async () => {
            const result = await axios.post(
                '/api/auth',
            );
            if (result.data.auth === false) { setAuth(false) }
            setData(result.data);
        };
        fetchData();
    }, [isAuth]);

    function handleChange(e: any) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleSend() {
        axios.post('/api/upload', {
            form
        }).then((res: any) => {
            setData(res.data)
        })
    }

    if (data.auth === true) {
        return (
            <Layout>
                {data.msg}
                <br />
                <button
                    onClick={() => handleSend()}
                >
                    test
                </button>
            </Layout>
        )
    } else
        return (
            <Layout>
                {data.msg}
                <br />
                <div>
                    <input
                        name='userName'
                        onChange={(e) => handleChange(e)}
                        type="text"
                    />
                    <br />
                    <input
                        name='pass'
                        onChange={(e) => handleChange(e)}
                        type="text"
                    />
                </div>
                <button
                    onClick={() => handleSend()}
                >
                    test
                </button>
                <p>
                    {form.userName}
                </p>
                <p>
                    {form.pass}
                </p>
            </Layout>
        )
}

export default Upload