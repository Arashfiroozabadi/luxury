/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
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
  Button,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Axios from 'axios';
import { Delete, NavigateBefore, NavigateNext } from '@material-ui/icons';

import Link from 'next/link';
import Product from '../Product';
import Loading from '../loading';
// eslint-disable-next-line no-unused-vars
import { FetchData } from '../../interface';
import RandNum from '../randNum';
import ConvertValue from '../ConvertValue';
import { FetchPostList } from '../customHooks';


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
    tableLayout: 'fixed',
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
      border: '1px solid #ffffff3b',
      borderBottom: 'none',
      padding: 10,
      borderRadius: 3,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
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
  openRowIconTop: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  openRowIconButtom: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      '& td': {
        width: '100%',
        '& > button': {
          width: '100%',
        },
      },
    },
  },
  tableRowDetail: {

  },
  tdProductCardInfo: {
    display: 'flex',
    opacity: 1,
    transition: 'background-color 250ms linear , color 250ms linear',

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

function EmptyRow(num) {
  let height;
  switch (num) {
    case 1:
      height = 230;
      break;
    case 2:
      height = 170;
      break;
    case 3:
      height = 120;
      break;
    case 4:
      height = 70;
      break;
    default:
      height = 0;
      break;
  }
  return (
    <tr style={{ height: `${height}px` }}>
      <td />
    </tr>
  );
}

function AllProducts() {
  const classes = useStyles();
  const [chunk, setChunk] = useState(0);
  const [openRowDetail, setOpenRowDetail] = useState({ open: false, target: 0 });
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMSG, setSnackMSG] = useState('');
  const [snackStutus, setSnackStatus] = useState(undefined);
  const { data, isError, isLoading } = FetchPostList(`chunk=${chunk}`, openSnack);

  const handleClose = () => {
    setOpenSnack(false);
  };
  const handleOpenRowDetail = (i) => () => {
    setOpenRowDetail({ open: true, target: i });
  };
  const handleCloseRowDetail = (i) => {
    setOpenRowDetail({
      open: false, target: i,
    });
  };
  const handleSendDeleteReq = (rowData) => {
    if (data.data.length === 1 && chunk > 0) {
      setChunk(chunk - 1);
    }
    // eslint-disable-next-line no-restricted-globals
    const conf = confirm(`${'تایید حذف'} ${rowData.title}`);
    if (conf === true) {
      Axios.put('/api/put', { rowData }).then((res) => {
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
  useEffect(() => () => {
    console.log('cleaned up');
  }, []);

  if (data.length !== 0) {
    return (
      <div className={classes.root}>
        <Container>
          <table className={classes.rootTable}>
            <thead className={classes.thead}>
              <tr className={classes.tr}>
                <th width="20" className={classes.th} />
                <th className={classes.th}>نام</th>
                <th className={classes.th}>دسته بندی</th>
                <th className={classes.th}>شناسه</th>
                <th className={classes.th}>بازدید</th>
                <th className={classes.th}>مدریت</th>
              </tr>
            </thead>
            <tbody className={classes.tbody}>
              { data.data.map((rowData, i) => (
                <React.Fragment key={RandNum()}>
                  <tr
                    className={classes.tr}
                  >
                    <td className={classes.openRowIconTop} width="20">
                      { openRowDetail.target === i && openRowDetail.open
                        ? (
                          <IconButton
                            onClick={() => handleCloseRowDetail(i)}
                          >
                            <NavigateBefore
                              style={{
                                transform: openRowDetail.target === i && openRowDetail.open
                                  ? 'rotate(-90deg)' : 'rotate(0deg)',
                              }}
                            />
                          </IconButton>
                        )
                        : (
                          <IconButton
                            onClick={handleOpenRowDetail(i)}
                          >
                            <NavigateBefore
                              style={{
                                transform: openRowDetail.target === i && openRowDetail.open
                                  ? 'rotate(-90deg)' : 'rotate(0deg)',
                              }}
                            />
                          </IconButton>
                        )}
                    </td>
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
                  <tr className={classes.openRowIconButtom}>
                    <td
                      colSpan="6"
                      style={{
                        padding: 0,
                      }}
                    >
                      {
                       openRowDetail.target === i && openRowDetail.open
                         ? (
                           <Button
                             variant="outlined"
                             onClick={() => handleCloseRowDetail(i)}
                             style={{
                               borderTop: 0,
                               borderTopRightRadius: 0,
                               borderTopLeftRadius: 0,
                             }}
                           >
                             پنهان شدن
                           </Button>
                         )
                         : (
                           <Button
                             variant="outlined"
                             onClick={handleOpenRowDetail(i)}
                             style={{
                               borderTop: 0,
                               borderTopRightRadius: 0,
                               borderTopLeftRadius: 0,
                             }}
                           >
                             نشان دادن
                           </Button>
                         )
                      }
                    </td>
                  </tr>
                  <tr
                    className={classes.tableRowDetail}
                  >
                    <td colSpan="6">
                      {openRowDetail.target === i && openRowDetail.open
                        ? (
                          <div className={classes.tdProductCardInfo}>
                            <Product
                              description={rowData.description}
                              title={rowData.title}
                              path={rowData.imagePath}
                            />
                          </div>
                        )
                        : null}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
              {EmptyRow(data.data.length)}

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
  } if (isError) {
    return (
      <div>
        <Typography
          variant="h6"
          component="h6"
        >
          <Box marginTop={4} textAlign="center">
            محصولی ثبت نشده است
          </Box>
          <Box marginTop={3} textAlign="center">
            <Link href="/upload" passHref>
              <a style={{
                textDecoration: 'none',
              }}
              >
                افزودن محصول
              </a>
            </Link>
          </Box>
        </Typography>
      </div>
    );
  }
  return null;
}

export default AllProducts;
