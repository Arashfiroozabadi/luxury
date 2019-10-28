import React, {
    // useState,
    // useEffect
} from 'react';
// import axios from 'axios';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Cards from '../components/Cards'
import { Container, Grid, Typography, Box } from '@material-ui/core';

const Layout = dynamic(
    () => import('../components/Layout'),
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
    }))

function Production() {
    const classes = useStyles();
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
            <Head>
                <title>محصولات ما</title>
            </Head>
            <Container>
                <Grid container justify="space-between">
                    <Grid
                        item
                        md={12}
                    >
                        <Typography
                            variant="h5"
                            component="h2"
                            gutterBottom
                        >
                            <Box>
                                محصولات ما
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item md={3} className={classes.cards} >
                        <Cards
                            title="مبلمان راحتی"
                            link="rahati"
                        />
                    </Grid>
                    <Grid item md={3} className={classes.cards} >
                        <Cards
                            title="مبلمان راحتی ال"
                            link="rahati-L"
                        />
                    </Grid>
                    <Grid item md={3} className={classes.cards} >
                        <Cards
                            title="سرویس خواب"
                            link="service-khab"
                        />
                    </Grid>
                    <Grid item md={3} className={classes.cards} >
                        <Cards
                            title="نهار خوری"
                            link="nahar-khori"
                        />
                    </Grid>
                    <Grid item md={3} className={classes.cards} >
                        <Cards
                            title="آینه کنسول"
                            link="console"
                        />
                    </Grid>
                </Grid>
            </Container>

            {/* {resp ?
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
            } */}
        </Layout>
    )
}

export default Production