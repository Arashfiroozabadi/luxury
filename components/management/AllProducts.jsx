/* eslint-disable no-alert */
import React, {
  useEffect, useState,
} from 'react';
import {
  makeStyles, createStyles,
  Container,
  Snackbar,
  Slide,
  IconButton,
  Typography,
  Box,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Axios from 'axios';
import { Delete, NavigateBefore, NavigateNext } from '@material-ui/icons';

// import Product from '../Product';
// import RTL from '../RTL';
import Loading from '../loading';
// eslint-disable-next-line no-unused-vars
import { FetchData } from '../../interface';
import RandNum from '../randNum';
import ConvertValue from '../ConvertValue';


const useStyles = makeStyles((theme) => createStyles({
  root: {
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  rootTable: {
    width: '100%',
    padding: theme.spacing(1),
    marginTop: 20,
    minHeight: 400,
    borderSpacing: 0,
    borderCollapse: 'separate',
    borderRadius: theme.spacing(0.5),
    boxShadow: theme.shadows[3],
    [theme.breakpoints.down('sm')]: {
      border: 'none',
    },
  },
  thead: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  tr: {
    width: '100%',
    textAlign: 'right',
    borderBottom: '1px solid',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid',
      margin: '15px 0px',
      padding: 10,
      borderRadius: theme.spacing(1),
      '& td:nth-of-type(1):before': {
        content: '"نام"',
      },
      '& td:nth-of-type(2):before': {
        content: '"دسته بندی"',
      },
      '& td:nth-of-type(3):before': {
        content: '"شناسه"',
      },
      '& td:nth-of-type(4):before': {
        content: '"بازدید"',
      },
      '& td:nth-of-type(5):before': {
        content: '"مدریت"',
      },
    },
  },
  th: {
    flex: 1,
    padding: theme.spacing(2),
  },
  td: {
    flex: 1,
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`,
    borderBottom: '1px solid',
    [theme.breakpoints.down('sm')]: {
      border: 'none !important',
      display: 'flex',
      padding: '0px 5px',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'space-between',
      '&:before': {
        position: 'relative',
        content: '"test"',
      },
    },
  },
  tdTextKey: {
    // border: 'none!important',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      padding: '12px 20px',
    },
  },
  tbody: {
    verticalAlign: 'top',
    '& tr:last-child': {

    },
    '& > :last-child': {
      '& td': {
        borderBottom: 'none',
      },
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      overflow: 'scroll',
      maxHeight: 340,
      flexDirection: 'column',
    },
  },
  dataPerPage: {
    display: 'flex',
    alignItems: 'center',
    '& >button': {
      transition: 'background-color 250ms linear , color 250ms linear',
    },
  },
  snackRoot: {
    width: '35%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      left: 0,
      right: 0,
    },
  },
  alertRoot: {
    width: '90%',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },
  alertAction: {
    marginLeft: 'initial',
  },
  rootDeleteIcon: {
    border: 'none!important',
  },
  labelDeletIcon: {
    border: 'none!important',
  },
  deleteIcons: {
    border: 'none!important',
    color: '#de0638',
  },
  tableContainer: {
    backgroundColor: theme.palette.background.default,
    transition: 'background-color 250ms linear',
  },
  loading: {
    textAlign: 'center',
    marginTop: 20,
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
  const [chunk, setChunk] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMSG, setSnackMSG] = useState('');
  const [snackStutus, setSnackStatus] = useState(undefined);

  const handleClose = () => {
    setOpenSnack(false);
  };
  const handleSendDeleteReq = (rowData) => {
    // eslint-disable-next-line no-restricted-globals
    const conf = confirm(`${'تایید حذف'} ${rowData.title}`);
    if (conf === true) {
      Axios.put('/api/put', { rowData }).then((res) => {
        console.log(res);
        setSnackStatus(res.status);
        setSnackMSG(`محصول "${rowData.title}" حذف شد‍‍`);
        setOpenSnack(true);
      }).catch((err) => {
        console.log(err.response);
        const { status } = err.response;
        if (status === 304) {
          setSnackStatus(status);
          setSnackMSG(`محصول "${rowData.title}" حذف یا یافت نشده است`);
          setOpenSnack(true);
        }
      });
    } else {
      alert('No');
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        if (!isError) {
          const result = await Axios.get(`/api/all/?chunk=${chunk}`);
          setData(result.data);
        }
      } catch (err) {
        setIsError(true);
        setOpenSnack(true);
        setData([]);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [openSnack, chunk]);

  useEffect(() => () => {
    console.log('cleaned up');
  }, []);

  console.log(isError);

  if (data.length !== 0) {
    return (
      <div className={classes.root}>
        <Container>
          <table className={classes.rootTable}>
            <thead className={classes.thead}>
              <tr className={classes.tr}>
                <th className={classes.th}>نام</th>
                <th className={classes.th}>دسته بندی</th>
                <th className={classes.th}>شناسه</th>
                <th className={classes.th}>بازدید</th>
                <th className={classes.th}>مدریت</th>
              </tr>
            </thead>
            <tbody className={classes.tbody}>
              { data.data.map((rowData) => (
                <tr className={classes.tr} key={RandNum()}>
                  <td className={classes.td}>
                    <p className={classes.tdTextKey}>
                      {rowData.title}
                    </p>
                  </td>
                  <td className={classes.td}>
                    <p className={classes.tdTextKey}>
                      {rowData.category}
                    </p>
                  </td>
                  <td className={classes.td}>
                    <p className={classes.tdTextKey}>
                      {rowData._id}
                    </p>
                  </td>
                  <td className={classes.td}>
                    <p className={classes.tdTextKey}>
                      {ConvertValue(rowData.views.length)}
                    </p>
                  </td>
                  <td className={classes.td}>
                    <IconButton
                      onClick={() => { handleSendDeleteReq(rowData); }}
                      classes={{
                        root: classes.rootDeleteIcon,
                        label: classes.labelDeletIcon,
                      }}
                    >
                      <Delete
                        className={classes.deleteIcons}
                      />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <div className={classes.dataPerPage}>
                    <IconButton
                      aria-label="before"
                      disabled={chunk === 0}
                      onClick={() => setChunk(chunk - 1)}
                    >
                      <NavigateNext />
                    </IconButton>
                    <Typography
                      variant="caption"
                    >
                      <Box>
                        صفحه
                        {' '}
                        {ConvertValue(chunk + 1)}
                        {' '}
                        از
                        {' '}
                        {ConvertValue(data.chunkSize)}
                      </Box>
                    </Typography>
                    <IconButton
                      aria-label="next"
                      disabled={data.chunkSize === chunk + 1}
                      onClick={() => setChunk(chunk + 1)}
                    >
                      <NavigateBefore />
                    </IconButton>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>

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
        </Container>
      </div>
    );
  } if (isLoading) {
    return (
      <div>
        <Loading size={60} className={classes.loading} />
      </div>
    );
  }
  return (
    <div>no post for show</div>
  );
}

export default AllProducts;
