import React, {
    useState,
    useEffect
} from 'react';
import axios from 'axios';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import Cards from '../components/Cards'
import { Container, Grid } from '@material-ui/core';

const Layout = dynamic(
    () => import('../components/Layout'),
    { loading: () => <p>loading...</p> }
)



function Production() {
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
            <Head>
                <title>Production</title>
            </Head>

            <h1>Production</h1>
            <Container>
                <Grid container justify="space-between">
                    <Grid item md={3}>
                        <Cards
                            title="مبلمان راحتی"
                            link="rahati"
                        />
                    </Grid>
                </Grid>
            </Container>

            {resp ?
                resp.map((d: any, index: any) => (
                    <div
                        key={index}
                    >
                        <h1>{d.title}</h1>
                        <h2>
                            {d.category}
                        </h2>
                        {
                            d.path.map((src: any, index: any) => (
                                <img
                                    key={index}
                                    src={src ? src : null}
                                    height={200}
                                    width={200}
                                />
                            ))
                        }
                        <h5>{d.description}</h5>
                    </div>
                )) :
                null
            }
        </Layout>
    )
}

export default Production