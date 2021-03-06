import React, { useEffect, useState } from 'react'; import axios from 'axios';
import Link from 'next/link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Visibility from '@material-ui/icons/Visibility';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';


import { Typography, Box } from '@material-ui/core';
import ConvertString from './ConvertString';
import RandNum from './randNum';
import Loading from './loading';
import ConvertValue from './ConvertValue';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    flexGrow: 1,

  },
  header: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 250ms linear , color 250ms linear',
    backgroundColor: theme.palette.background.default,
  },
  imgContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    '&:hover': {
      '& .productLink': {
        transform: 'translateY(-10px)',
      },
    },
  },
  imgBox: {
    position: 'relative',
  },
  img: {
    height: 300,
    display: 'block',
    margin: '10px 10px',
    overflow: 'hidden',
    width: 'calc(100% - 20px)',
    boxShadow: theme.shadows['6'],
    borderRadius: theme.shape.borderRadius,
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 5,
    },
  },
  imgViews: {
    top: 10,
    right: 10,
    padding: '0 5px',
    position: 'absolute',
    borderRadius: 4,
    backgroundColor: 'gray',
    '& p': {
      margin: '0px 5px',
      fontSize: 12,
    },
  },
  productLink: {
    color: 'gold',
    width: 'calc(100% - 20px);',
    bottom: 0,
    position: 'absolute',
    textAlign: 'center',
    transform: 'translateY(55px)',
    transition: 'transform 0.2s',
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    backgroundColor: '#171717cc',
    '& span': {
      color: 'gold',
      fontSize: 18,
    },
  },
  MobileStepper: {
    transition: 'background-color 250ms linear , color 250ms linear',
  },
  loaderClass: {
    display: 'flex',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function Carousel(): JSX.Element|null {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [res, setRes] = useState<any | null>([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.post(
        '/api/banner',
      );
      setRes(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => () => {
    console.log('cleaned up');
  }, []);

  const maxSteps = res.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: any) => {
    setActiveStep(step);
  };
  if (isLoading) {
    return (
      <Loading
        size={80}
        className={classes.loaderClass}
      />
    );
  }
  return (
    res.length !== 0
      ? (
        <div className={classes.root}>
          <Paper square elevation={0} className={classes.header}>
            <Link
              href="/product/[id]"
              as={`/product/${res[activeStep]._id}`}
              passHref
            >
              <Button
                size="small"
                color="primary"
                component="a"
              >
                {`${ConvertString(res[activeStep].category)} ${res[activeStep].title}`}
              </Button>
            </Link>
          </Paper>
          <AutoPlaySwipeableViews
            interval={40000}
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {res.map((step: any, index: any) => (
              <div key={RandNum()}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <div
                    className={classes.imgContainer}
                  >
                    <div className={classes.imgBox}>
                      <img
                        className={classes.img}
                        src={step.imagePath[step.bannerPath]}
                        alt={res[index].title}
                      />
                      <span className={classes.imgViews}>
                        <Typography
                          variant="caption"
                          component="span"
                        >
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <p>
                              {ConvertValue(res[index].views.length)}
                            </p>
                            {' '}
                            <Visibility />
                          </Box>
                        </Typography>
                      </span>
                    </div>
                    <div
                      className={clsx(classes.productLink, 'productLink')}
                    >
                      <Link
                        href={`/product/${res[activeStep]._id}`}
                        as={`/product/${res[activeStep]._id}`}
                        passHref
                      >
                        <Button
                          size="large"
                          component="a"
                        >
                          مشاهده محصول
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            className={classes.MobileStepper}
            steps={maxSteps}
            variant="dots"
            position="static"
            activeStep={activeStep}
            nextButton={(
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                بعدی
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            )}
            backButton={(
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                قبلی
              </Button>
            )}
          />
        </div>
      )
      : null
  );
}

export default Carousel;
