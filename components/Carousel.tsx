import React, { useEffect, useState } from 'react'; import axios from 'axios';
import Link from 'next/link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';


import ConverString from './ConverString';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '100%',
        flexGrow: 1,

    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
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
            }
        }
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
            fontSize: 18
        }
    }
}));

function Carousel() {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const [res, setRes] = useState<any | null>([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.post(
                '/api/banner'
            );
            setRes(result.data);
        };
        fetchData();
    }, []);
    console.log(res);
    const maxSteps = res.length;


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
        res.length !== 0 ?
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
                            {`${ConverString(res[activeStep].category)} ${res[activeStep].title}`}
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
                        < div key={index} >
                            {
                                Math.abs(activeStep - index) <= 2 ? (
                                    <div
                                        className={classes.imgContainer}
                                    >
                                        <img
                                            className={classes.img}
                                            src={step.path[step.bannerPath]}
                                            alt={step.title}
                                        />
                                        <div
                                            className={clsx(classes.productLink, 'productLink')}
                                        >
                                            <Link
                                                href="/product/[id]"
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
                                ) : null
                            }
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
            </div >
            :
            null
    );
}

export default Carousel;