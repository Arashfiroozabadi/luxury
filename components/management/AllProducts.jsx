/* eslint-disable no-alert */
import React, {
  useEffect, useState, useRef,
} from 'react';
import {
// eslint-disable-next-line no-unused-vars
  makeStyles, createStyles, MuiThemeProvider,
  createMuiTheme,
  Snackbar,
  Slide,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Axios from 'axios';
import MaterialTable, { MTableBodyRow } from 'material-table';
import { red } from '@material-ui/core/colors';
import { useSelector } from 'react-redux';

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
  snackRoot: {
    width: '35%',
  },
  alertRoot: {
    width: '100%',
    justifyContent: 'space-between',
  },
  alertAction: {
    marginLeft: 'initial',
  },
  tableContainer: {
    backgroundColor: theme.palette.background.default,
    transition: 'background-color 250ms linear',
  },
}));

function TransitionUp(props) {
  return <Slide {...props} direction="down" />;
}

function StatusCode(code) {
  switch (code) {
    case 200:
      return 'success';
    case 304:
      return 'warning';
    default:
      return undefined;
  }
}


function AllProducts() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const [openSnack, setOpenSnack] = useState(false);
  const [snackMSG, setSnackMSG] = useState('');
  const [snackStutus, setSnackStatus] = useState(undefined);

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
  const handleClose = () => {
    setOpenSnack(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get('/api/all');
      setData(result.data);
    };

    fetchData();
  }, [openSnack]);

  if (data.length !== 0) {
    return (
      <div className={classes.root}>
        <div>
          <Snackbar
            classes={{
              root: classes.snackRoot,
            }}
            open={openSnack}
            message={snackMSG}
            onClose={handleClose}
            TransitionComponent={TransitionUp}
            // autoHideDuration={6000}
          >
            <MuiAlert
              classes={{
                root: classes.alertRoot,
                action: classes.alertAction,
              }}
              elevation={6}
              variant="filled"
              onClose={handleClose}
              severity={StatusCode(snackStutus)}
            >
              {snackMSG}
            </MuiAlert>
          </Snackbar>
          <RTL>
            <MuiThemeProvider theme={t ? theme1 : theme2}>
              <MaterialTable
                components={{
                  Container: (props) => (
                    <div className={classes.tableContainer}>
                      <div {...props} />
                    </div>
                  ),
                  Row: (props) => (
                    <MTableBodyRow customstyle="rotate(-90deg)" {...props} />
                  ),
                }}
                actions={[
                  (rowData) => ({
                    icon: 'delete',
                    tooltip: 'حذف',
                    onClick: (event, d) => {
                    // eslint-disable-next-line no-restricted-globals
                      const conf = confirm(`${'تایید حذف'} ${d.title}`);
                      if (conf === true) {
                        Axios.put('/api/put', { id: rowData._id }).then((res) => {
                          console.log(res);
                          setSnackStatus(res.status);
                          setSnackMSG(`محصول "${d.title}" حذف شد‍‍`);
                          setOpenSnack(true);
                        }).catch((err) => {
                          console.log(err.response);
                          const { status } = err.response;
                          if (status === 304) {
                            setSnackStatus(status);
                            setSnackMSG(`محصول "${d.title}" حذف یا یافت نشده است`);
                            setOpenSnack(true);
                          }
                        });
                      } else {
                        alert('No');
                      }
                    },
                  }),
                ]}
                localization={{
                  toolbar: { searchPlaceholder: 'جستوجو' },
                }}
                options={{
                  pageSize: 5,
                  pageSizeOptions: [5, 10, 15],
                  actionsColumnIndex: -1,
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
                detailPanel={[
                  {
                    icon: 'chevron_left',
                    render: (rowData) => (
                      <Product
                        description={rowData.description}
                        title={rowData.title}
                        path={rowData.path}
                      />
                    ),
                  },
                ]}
                tableRef={tableRef}
                onRowClick={(_event, _rowData, toggleDetailPanel) => {
                  toggleDetailPanel();
                }}
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
