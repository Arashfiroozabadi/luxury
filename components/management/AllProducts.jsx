import React, { useEffect, useState, useRef } from 'react';
import {
// eslint-disable-next-line no-unused-vars
  makeStyles, createStyles, MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core';
import Axios from 'axios';
import MaterialTable from 'material-table';
import { red } from '@material-ui/core/colors';
import { useSelector } from 'react-redux';

// eslint-disable-next-line no-unused-vars
import Product from '../Product';
import RTL from '../RTL';
// eslint-disable-next-line no-unused-vars
import { FetchData } from '../../interface';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  tableContainer: {
    backgroundColor: theme.palette.background.default,
    transition: 'background-color 250ms linear',
  },
}));


function AllProducts() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const tableRef = useRef();

  const t = useSelector((state) => state.theme);

  const theme1 = createMuiTheme({
    direction: 'rtl',
    typography: {
      fontFamily: [
        'Vazir',
      ].join(','),
    },
    palette: {
      type: 'dark',
      primary: {
        main: '#ffd700',
      },
      testText: {
        main: 'blue',
      },
      secondary: {
        main: '#212121',
        dark: '#171717',
      },
      error: {
        main: red.A400,
      },
      background: {
        default: '#171717',
      },
    },
  });
  const theme2 = createMuiTheme({
    direction: 'rtl',
    typography: {
      fontFamily: [
        'Vazir',
      ].join(','),
    },
    palette: {
      type: 'light',
      primary: {
        main: '#ffd700',
      },
      secondary: {
        main: '#212121',
        dark: '#171717',
      },
      error: {
        main: red.A400,
      },
      background: {
        default: '#fff',
      },
      testText: {
        main: 'red',
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get('/api/all');
      setData(result.data);
    };

    fetchData();
  }, []);

  if (data.length !== 0) {
    data.map((d) => console.log(d));
    return (
      <div className={classes.root}>
        <div>
          <RTL>
            <MuiThemeProvider theme={t ? theme1 : theme2}>
              <MaterialTable
                components={{
                  Container: (props) => (
                    <div className={classes.tableContainer}>
                      <div {...props} />
                    </div>
                  ),
                }}
                localization={{
                  toolbar: { searchPlaceholder: 'جستوجو' },
                }}
                options={{
                  pageSize: 10,
                  pageSizeOptions: [10, 20, 30],
                }}
                title="محصولات"
                columns={[
                  { title: 'نام', field: 'title' },
                  { title: 'ID', field: '_id' },
                  {
                    title: 'banner',
                    field: 'banner',
                    render: (rowData) => (rowData.banner ? 'true' : 'false'),
                  },
                  {
                    title: 'دسته بندی',
                    field: 'category',
                    render: (rowData) => (rowData.category),
                  },
                ]}
                data={data}
                detailPanel={(rowData) => (
                  <Product
                    description={rowData.description}
                    title={rowData.title}
                    path={rowData.path}
                  />
                )}
                tableRef={tableRef}
                onRowClick={(_event, _rowData, toggleDetailPanel) => toggleDetailPanel()}
              />
            </MuiThemeProvider>
          </RTL>
        </div>
      </div>
    );
  }
  return (
    <div>
      بارگذاری ...
    </div>
  );
}

export default AllProducts;
