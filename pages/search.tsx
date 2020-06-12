/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  // eslint-disable-next-line no-unused-vars
  Theme,
  makeStyles, createStyles,
} from '@material-ui/core/styles';
import {
  TextField, IconButton,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Collapse,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import Axios from 'axios';
import {
  Layout, Div,
  AppTheme, Paper, RTL,
  ColorCate,
  Loading,
  ListItems,
} from '../components';


const useStyles = makeStyles((theme:Theme) => createStyles({
  container: {
    [theme.breakpoints.down('sm')]: {
      padding: 8,
    },
  },
  root: {
    [theme.breakpoints.down('sm')]: {

    },
  },
  rootFormControlRoot: {
    width: '100%',
    display: 'flex',
    overflow: 'hidden',
  },
  showListButton: {
    transition: 'transform 200ms linear ,color 200ms linear ',
    marginTop: 5,
    borderRadius: 4,
  },
  radioGroup: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  radioItem: {
    margin: 5,
    border: '1px solid',
    padding: '0px 5px',
    paddingLeft: 14,
    borderRadius: 5,
  },
  radio: {
    transition: 'color 200ms linear ',
  },
  rootForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  searchInputLabel: {
    color: 'red',
  },
  submitButton: {
    transition: 'background-color 200ms linear ,color 200ms',
    marginTop: 5,
    borderRadius: 4,
  },
  loading: {
    display: 'flex',
    marginTop: 10,
    justifyContent: 'center',
  },
  listItems: {
    display: 'flex',
  },
}));

interface dataProps{
  radioValue?: string | React.ChangeEvent<HTMLInputElement> | any
  searchValue? : any | string | React.ChangeEvent<HTMLInputElement> | any
  _id?: string | undefined
}

interface errProps{
  err: boolean
  msg?: string | undefined
}


function text(value:string) {
  switch (value) {
    case '_id':
      return "با شناسه 'id'";
    case 'rahati':
      return 'در راحتی';
    case 'rahatil':
      return 'در راحتی ال';
    case 'servicekhab':
      return 'در سرویس خواب';
    case 'naharkhori':
      return 'در نهار خوری';
    case 'console':
      return 'در آینه کنسول';
    default:
      return 'در همه‌‌‌ی دسته‌ها';
  }
}

function Search() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [data, setData] = useState<dataProps>({
    radioValue: 'all',
    _id: undefined,
    searchValue: undefined,
  });
  const [fetchData, setFetchData] = useState<any>([]);
  const [fetchErr, setFetchErr] = useState(false);
  const [err, setErr] = useState<errProps>({
    err: false,
  });
  const [isLoading, setLoading] = useState(false);

  function handlesetData(e:React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === '_id') {
      setData({
        _id: e.target.value,
        radioValue: undefined,
        searchValue: data.searchValue,
      });
    } else {
      setData({
        radioValue: e.target.value,
        searchValue: data.searchValue,
      });
    }
  }
  function handleInputChange(e:React.ChangeEvent<HTMLInputElement>) {
    setData({
      radioValue: data.radioValue,
      searchValue: e.target.value,
    });
  }
  async function handleSubmitForm(e:React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    console.log(data);
    const { searchValue } = data;
    if (searchValue === undefined) {
      setErr({
        err: true,
        msg: 'این گزینه را پر کنید',
      });
    } else if (searchValue.length === 0) {
      setErr({
        err: true,
        msg: 'این گزینه را پر کنید',
      });
    } else {
      setErr({ err: false, msg: undefined });
      setOpen(false);
      const query = {
        cate: data.radioValue,
        _id: data._id,
        name: data.searchValue.toLowerCase(),
      };
      setLoading(true);
      await Axios.post('/api/search', query).then((result) => {
        setLoading(false);
        setFetchErr(false);
        setFetchData(result.data);
      }).catch(() => {
        setLoading(false);
        setFetchErr(true);
      });
    }
  }


  function handleShowList() {
    setOpen(!open);
  }
  return (
    <AppTheme>
      <Layout>
        <Container className={classes.container}>
          <Div>
            <Paper>
              <div className={classes.root}>
                <FormControl className={classes.rootFormControlRoot}>
                  <FormLabel
                    style={{
                      transition: 'color 200ms',
                      color: data.radioValue === 'all' ? 'gold' : data.radioValue === '_id'
                        ? '#1576da'
                        : ColorCate(data.radioValue),
                    }}
                  >
                    جستوجو
                    {` ${text(data.radioValue)}`}
                  </FormLabel>
                  <IconButton
                    onClick={() => handleShowList()}
                    className={classes.showListButton}
                    style={{
                      transform: `rotateX(${open ? '0deg' : '180deg'})`,
                    }}
                  >
                    <ArrowDownwardIcon />
                  </IconButton>
                  <Collapse in={open}>
                    <RadioGroup
                      className={classes.radioGroup}
                      aria-label="search type"
                      name="searchType"
                      onChange={(e) => handlesetData(e)}
                      value={data.radioValue ? data.radioValue : data._id}
                    >
                      <FormControlLabel
                        className={classes.radioItem}
                        value="all"
                        label="در همه‌‌‌ی دسته‌ها"
                        control={(
                          <Radio
                            className={classes.radio}
                            style={{
                              color: data.radioValue === 'all' ? 'gold' : '',
                            }}
                          />
                        )}
                        style={{
                          borderColor: 'gold',
                        }}
                      />
                      <FormControlLabel
                        className={classes.radioItem}
                        value="_id"
                        control={(
                          <Radio
                            className={classes.radio}
                            style={{
                              color: data.radioValue === '_id' ? '#1576da' : '',
                            }}
                          />
                        )}
                        label="با شناسه 'id'"
                        style={{
                          borderColor: '#1576da',
                        }}
                      />
                      <FormControlLabel
                        className={classes.radioItem}
                        value="rahati"
                        control={(
                          <Radio
                            className={classes.radio}
                            style={{
                              color: data.radioValue === 'rahati' ? ColorCate('rahati') : '',
                            }}
                          />
                        )}
                        label="راحتی"
                        style={{
                          borderColor: ColorCate('rahati'),
                        }}
                      />
                      <FormControlLabel
                        className={classes.radioItem}
                        value="rahatil"
                        control={(
                          <Radio
                            className={classes.radio}
                            style={{
                              color: data.radioValue === 'rahatil' ? ColorCate('rahatil') : '',
                            }}
                          />
                        )}
                        label="راحتی ال"
                        style={{
                          borderColor: ColorCate('rahatil'),
                        }}
                      />
                      <FormControlLabel
                        className={classes.radioItem}
                        value="servicekhab"
                        control={(
                          <Radio
                            className={classes.radio}
                            style={{
                              color: data.radioValue === 'servicekhab' ? ColorCate('servicekhab') : '',
                            }}
                          />
                        )}
                        label="سرویس خواب"
                        style={{
                          borderColor: ColorCate('servicekhab'),
                        }}
                      />
                      <FormControlLabel
                        className={classes.radioItem}
                        value="naharkhori"
                        control={(
                          <Radio
                            className={classes.radio}
                            style={{
                              color: data.radioValue === 'naharkhori' ? ColorCate('naharkhori') : '',
                            }}
                          />
                        )}
                        label="نهار خوری"
                        style={{
                          borderColor: ColorCate('naharkhori'),
                        }}
                      />
                      <FormControlLabel
                        className={classes.radioItem}
                        value="console"
                        control={(
                          <Radio
                            className={classes.radio}
                            style={{
                              color: data.radioValue === 'console' ? ColorCate('console') : '',
                            }}
                          />
                        )}
                        label="آینه کنسول"
                        style={{
                          borderColor: ColorCate('console'),
                        }}
                      />
                    </RadioGroup>
                  </Collapse>
                </FormControl>
                <div>
                  <RTL>
                    <form
                      className={classes.rootForm}
                      onSubmit={(e:any) => handleSubmitForm(e)}
                    >
                      <TextField
                        required={err.err}
                        error={err.err}
                        label="جستوجو"
                        helperText={err.msg}
                        onChange={(e:any) => handleInputChange(e)}
                      />
                      <IconButton
                        type="submit"
                        aria-label="search"
                        className={classes.submitButton}
                        style={{
                          backgroundColor: data.radioValue === 'all' ? 'gold' : data._id === '_id'
                            ? '#1576da'
                            : ColorCate(data.radioValue),
                        }}
                      >
                        <SearchIcon />
                      </IconButton>
                    </form>
                  </RTL>
                </div>
              </div>
            </Paper>
            <div>
              { isLoading
                ? (
                  <Loading className={classes.loading} size={30} />
                )
                : (
                  <ListItems data={fetchData} err={fetchErr} />
                )}
            </div>
          </Div>
        </Container>
      </Layout>
    </AppTheme>
  );
}

export default Search;
