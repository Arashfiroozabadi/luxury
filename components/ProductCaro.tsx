import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Button, MobileStepper } from '@material-ui/core';



const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    carousel: {
        // width: '50%'
    },
    thumbs: {
        // width: '50%'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: theme.palette.background.default,
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
    },
}));



function ProductCaro(props: any) {
    const { path } = props
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = path.length;

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleStepChange = (step: any) => {
        setActiveStep(step);
    };

    return (
        <div
            className={classes.root}
        >
            <div
                className={classes.carousel}
            >
                <AutoPlaySwipeableViews
                    interval={5000}
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {path.map((step: any, index: any) => (
                        <div key={index}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <img
                                    className={classes.img}
                                    src={'/' + step}
                                />
                            ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    variant="dots"
                    activeStep={activeStep}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                            بعدی
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            قبلی
                    </Button>
                    }
                />
            </div>
            <Paper
                className={classes.thumbs}
            >
                {path.map((p: any, i: any) => (
                    <img
                        key={i}
                        src={'/' + p}
                        alt=""
                        height="80"
                        width="80"
                        onClick={() => handleStepChange(i)}
                        style={{
                            border: activeStep === i ? '1px solid red' : ''
                        }}
                    />
                ))}
            </Paper>
        </div>
    )
}

export default ProductCaro;