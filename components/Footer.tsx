import Link from 'next/link';

import {
    Grid,
    Container,
    Box,
    Typography,
    Divider,
    Toolbar
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { KeyboardArrowLeft, Call, LocationOnOutlined, Instagram, Telegram, Twitter } from '@material-ui/icons';
import Logo from './Logo';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            // height: 240,
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.common.white,
            [theme.breakpoints.only('xs')]: {
                width: '100%',
            },
        },
        list: {
            width: '70%',
            padding: 0,
            display: 'flex',
            justifyContent: 'space-between',
            listStyle: 'none',
            [theme.breakpoints.only('xs')]: {
                width: '100%',
                flexDirection: 'column',
            },
        },
        listItem: {
            padding: '1.3rem',
            transition: 'background-color 200ms',
            borderRadius: 5,
            '&:hover': {
                backgroundColor: '#1b1b1b',
                '& svg': {
                    marginRight: 5
                }
            },
        },
        boxs: {

        },
        boxCaption: {
            width: 110,
            color: '#adacacb8'
        },
        links: {
            color: '#ffd54f',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            '& svg': {
                transition: 'margin 200ms',
                marginRight: 1,
            }
        },
        logoRoot: {
            paddingTop: 40,
        },
        logo: {
            fontSize: '2.6rem'
        },
        CallNum: {
            direction: 'ltr',
            '& > div': {
                display: 'flex',
                position: 'relative',
                alignItems: 'center',
            },
            '& > div > svg': {
                color: blue[500],
            },
            '& > div > a': {
                left: 25,
                bottom: -4,
                color: '#adacacb8',
                position: 'absolute',
                textDecoration: 'none',
            }
        },
        social: {
            display: 'flex',
            padding: '5px 0px',
            marginTop: '10px',
            backgroundColor: 'transparent',
            '& a': {
                color: '#adacacb8',
                margin: '0px 5px',
                display: 'flex',
            },
            '& a:first-child': {
                margin: '0 5px 0 0'
            }
        },
        divider: {
            width: '100%',
            backgroundColor: '#252525',
            margin: '10px 0',
        }
    }),
);


function Footer() {
    const classes = useStyles();
    return (
        <footer>
            <Toolbar />
            <div
                className={classes.root}
            >
                <Grid
                    container
                >
                    <Grid
                        item
                        lg={6}
                        xs={6}
                    >
                        <Container>
                            <ul
                                className={classes.list}
                            >
                                <li
                                    className={classes.listItem}
                                >
                                    <Box
                                        className={classes.boxs}
                                    >

                                        <Typography
                                            component="h3"
                                            variant="h6"
                                            gutterBottom
                                        >
                                            <Box
                                                fontWeight="fontWeightRegular"
                                            >
                                                درباره ما
                                            </Box>
                                        </Typography>
                                        <Typography
                                            className={classes.boxCaption}
                                            component="p"
                                            variant="caption"
                                        >
                                            گالری مبل لاکچری عرضه کننده انواع مبلمان ...
                                        </Typography>
                                        <Link
                                            href="about-us"
                                        >
                                            <a
                                                className={classes.links}
                                            >
                                                بیشتر بدانید
                                                <KeyboardArrowLeft
                                                    fontSize="small"
                                                />
                                            </a>
                                        </Link>
                                    </Box>
                                </li>
                                <li
                                    className={classes.listItem}
                                >
                                    <Box
                                        className={classes.boxs}
                                    >

                                        <Typography
                                            component="h3"
                                            variant="h6"
                                            gutterBottom
                                        >
                                            <Box
                                                fontWeight="fontWeightRegular"
                                            >
                                                تماس با ما
                                            </Box>
                                        </Typography>
                                        <Typography
                                            className={classes.boxCaption}
                                            component="p"
                                            variant="caption"
                                        >
                                            راه‌های ارتباطی با ما
                                        </Typography>
                                        <Link
                                            href="call-us"
                                        >
                                            <a
                                                className={classes.links}
                                            >
                                                بیشتر بدانید
                                                <KeyboardArrowLeft
                                                    fontSize="small"
                                                />
                                            </a>
                                        </Link>
                                    </Box>
                                </li>
                            </ul>
                        </Container>
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        xs={6}
                    >
                        <Container
                            dir="ltr"
                        >
                            <Logo
                                rootClass={classes.logoRoot}
                                textClass={classes.logo}
                            />
                            <Typography
                                className={classes.CallNum}
                                variant="caption"
                            >
                                <Box>
                                    <Call
                                        fontSize="small"
                                    />
                                    <a
                                        href="tel:021 6655 6655"
                                    >
                                        021 6655 6655
                                    </a>
                                </Box>
                            </Typography>
                            <Grid
                                container
                            >
                                <Grid
                                    item
                                    md={3}
                                    xs={12}
                                >
                                    <div
                                        className={classes.social}
                                    >
                                        <a>
                                            <Instagram />
                                        </a>
                                        <a href="">
                                            <Telegram />
                                        </a>
                                        <a href="">
                                            <Twitter />
                                        </a>
                                    </div>
                                </Grid>
                            </Grid>
                        </Container>
                    </Grid>
                    <Divider
                        className={classes.divider}
                    />
                    <Grid
                        item
                        xs={12}
                    >
                        <Container>
                            <Typography
                                variant='caption'
                                component="h6"
                            >
                                <Box
                                    fontWeight="fontWeightLight"
                                    p="5px 25px"
                                    m="10px 0"
                                    color="#adacacb8"
                                    textAlign="center"

                                >
                                    <div>
                                        <LocationOnOutlined />
                                    </div>
                                    البرز مشکین‌ دشت بلوار امام علی
                                    گالری مبل لاکچری
                                </Box>
                            </Typography>
                        </Container>
                    </Grid>
                </Grid>
            </div>
        </footer>
    )
}

export default Footer;