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
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import {
  Layout, Div,
  AppTheme, Paper, RTL, ColorCate,
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
  rootForm: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

function Search() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
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
                  <FormLabel>انتخاب نو جستوجو</FormLabel>
                  <IconButton
                    onClick={() => handleShowList()}
                    style={{
                      transition: 'transform 200ms linear',
                      transform: `rotateX(${open ? '0deg' : '180deg'})`,
                    }}
                  >
                    <ArrowDownwardIcon />
                  </IconButton>
                  <RadioGroup
                    className={classes.radioGroup}
                    aria-label="search type"
                    name="searchType"
                    onChange={() => console.log('res')}
                    style={{
                      willChange: 'height',
                      transition: 'height 200ms linear',
                      // transform: `translateY(${open ? '0px' : '-300px'})`,
                      height: open ? '200px' : 0,
                    }}
                  >
                    <FormControlLabel
                      className={classes.radioItem}
                      value="all"
                      label="در همه‌‌‌ی دسته‌ها"
                      control={<Radio />}
                      style={{
                        borderColor: 'gold',
                      }}
                    />
                    <FormControlLabel
                      className={classes.radioItem}
                      value="_id"
                      control={<Radio />}
                      label="با شناسه 'id'"
                      style={{
                        borderColor: '#1576da',
                      }}
                    />
                    <FormControlLabel
                      className={classes.radioItem}
                      value="rahati"
                      control={<Radio />}
                      label="راحتی"
                      style={{
                        borderColor: ColorCate('rahati'),
                      }}
                    />
                    <FormControlLabel
                      className={classes.radioItem}
                      value="rahatil"
                      control={<Radio />}
                      label="راحتی ال"
                      style={{
                        borderColor: ColorCate('rahatil'),
                      }}
                    />
                    <FormControlLabel
                      className={classes.radioItem}
                      value="servicekhab"
                      control={<Radio />}
                      label="سرویس خواب"
                      style={{
                        borderColor: ColorCate('servicekhab'),
                      }}
                    />
                    <FormControlLabel
                      className={classes.radioItem}
                      value="naharkhori"
                      control={<Radio />}
                      label="نهار خوری"
                      style={{
                        borderColor: ColorCate('naharkhori'),
                      }}
                    />
                    <FormControlLabel
                      className={classes.radioItem}
                      value="console"
                      control={<Radio />}
                      label="آینه کنسول"
                      style={{
                        borderColor: ColorCate('console'),
                      }}
                    />
                  </RadioGroup>
                </FormControl>
                <div>
                  <RTL>
                    <form
                      className={classes.rootForm}
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <TextField
                        label="جستوجو"
                      />
                      <IconButton type="submit" aria-label="search">
                        <SearchIcon />
                      </IconButton>
                    </form>
                  </RTL>
                </div>
              </div>
            </Paper>
          </Div>
        </Container>
      </Layout>
    </AppTheme>
  );
}

export default Search;
