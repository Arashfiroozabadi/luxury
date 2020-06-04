import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Button, MobileStepper } from '@material-ui/core';

import RandNum from './randNum';
import Loading from './loading';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 600,
  },
  carousel: {
  },
  mobileStepperRoot: {
    transition: 'background-color 250ms linear , color 250ms linear',
    paddingBottom: 0,
  },
  thumbs: {
    padding: 5,
    display: 'flex',
    justifyContent: 'space-evenly',
    transition: 'background-color 250ms linear , color 250ms linear',
  },
  imgThumbs: {
    boxShadow: theme.shadows['4'],
    transition: 'all 0.2s',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      border: '2px solid #556cd694',
    },
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
    [theme.breakpoints.only('xs')]: {
      height: 240,
    },
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


function ProductCaro(props: any) {
  const { path } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = path.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: any) => {
    setActiveStep(step);
  };
  if (path.length === -1) {
    return (
      <Loading className={classes.loaderClass} size={80} />
    );
  }
  return (
    <div
      className={classes.root}
    >
      <div
        className={classes.carousel}
      >
        <AutoPlaySwipeableViews
          interval={50000}
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {path.map((step: any, index: any) => (
            <div key={RandNum()}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  className={classes.img}
                  src={step}
                  alt=""
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          className={classes.mobileStepperRoot}
          steps={maxSteps}
          position="static"
          variant="dots"
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
      <Paper
        className={classes.thumbs}
      >
        {path.map((p: any, i: any) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <img
            className={classes.imgThumbs}
            key={RandNum()}
            src={p}
            alt=""
            height="50"
            width="50"
            onClick={() => handleStepChange(i)}
            onKeyDown={(e) => (console.log(e))}
            style={{
              border: activeStep === i ? '2px solid #556cd6' : '',
            }}
          />
        ))}
      </Paper>
    </div>
  );
}

export default ProductCaro;
