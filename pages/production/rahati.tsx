import React, {
    // useState,
    // useEffect
} from 'react';
// import axios from 'axios';
// import Head from 'next/head';
import dynamic from 'next/dynamic';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const Layout = dynamic(
    () => import('../../components/Layout'),
    { loading: () => <p>loading...</p> }
)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        cards: {
            margin: '5px 5px',
            [theme.breakpoints.only('xs')]: {
                width: '100%',
            },
        },
    })
)

function Rahati() {
    const classes = useStyles()
    // const [resp, setResp] = useState<any | null>([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios.get(
    //             '/api/all',
    //         );
    //         setResp(result.data);
    //     };
    //     fetchData();
    // }, []);
    return (
        <Layout>
            <div
                className={classes.root}
            >
                <h1>dasd</h1>
            </div>
        </Layout>
    )
}

export default Rahati