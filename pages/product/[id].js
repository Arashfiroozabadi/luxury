import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
// import { useSelector } from 'react-redux'
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box
} from '@material-ui/core';

import ProductCaro from '../../components/ProductCaro';


export default function Post() {
  // const data = useSelector(state => state.data)
  const [res, setRes] = useState([]);
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(
        '/api/product',
        {
          target: id
        }
      );
      setRes(result.data);
    };
    fetchData();
  }, []);
  // console.log(res.path);

  return (
    < Layout >
      <Container>
        <Grid container justify="center" >
          <Grid item
            md={12}

          >
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                // className={classes.title}
                >
                  <Box>
                    {`مدل ${res.title}`}
                  </Box>
                </Typography>
              </CardContent>
              <CardContent>
                {
                  res.path ?
                    <div
                      style={{
                        display: 'flex'
                      }}
                    >
                      <Typography
                        style={{
                          width: '50%'
                        }}
                        variant="h6"
                        component="h5"
                        gutterBottom
                      // className={classes.title}
                      >
                        <Box>
                          {`مدل ${res.description}`}
                        </Box>
                      </Typography>
                      <ProductCaro
                        path={res.path}
                      />
                    </div>
                    :
                    null
                }
              </CardContent>
              <CardContent>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout >
  );
}