import React, { useState } from 'react';
import Link from 'next/link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
    AppBar, Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    useScrollTrigger,
    Slide,
    // Slide
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Logo from './Logo';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        logo: {
            textDecoration: 'none'
        },
        navList: {
            width: '100%',
            display: 'flex',
            listStyle: 'none',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            '& li': {
                '& a': {
                    textDecoration: 'none'
                }
            }
        },
        menuButton: {
            color: theme.palette.secondary.dark,
        },
        toolBar: {
            justifyContent: 'space-between'
        },
        logoList: {
            fontSize: 20
        }
    }))
interface Props {
    children: React.ReactElement;
}

function HideOnScroll(props: Props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 250
    })

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 2,
        direction: "down",
        appear: false,
        in: !trigger
    });
}

function Nav(props: any) {
    const [open, setOpen] = useState(false)
    const classes = useStyles();

    function handleOpen() {
        setOpen(!open)
    }
    function handleClose() {
        setOpen(false)
    }
    return (
        <div
            className={classes.root}
        >
            <HideOnScroll>
                <Slide
                    timeout={{
                        enter: 200,
                        exit: 750
                    }}
                    {...props}
                >
                    <AppBar
                        position="fixed"
                        color="default"
                    >
                        <Toolbar
                            className={classes.toolBar}
                        >
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                onClick={() => handleOpen()}
                            >
                                <MenuIcon
                                    fontSize="large"
                                />
                            </IconButton>
                            <Typography
                                variant="h6"
                            >
                                <Link href="/">
                                    <a
                                        className={classes.logo}
                                    >
                                        <Logo />
                                    </a>
                                </Link>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Slide>
            </HideOnScroll>
            <Toolbar />
            <Toolbar />
            <Drawer
                open={open}
                anchor="left"
                onClose={
                    () => handleClose()
                }
            >
                <div>
                    <List>
                        <Link href="/" passHref>
                            <ListItem component="a" button>
                                <div>
                                    <Logo
                                        textClass={classes.logoList}
                                    />
                                </div>
                            </ListItem>
                        </Link>
                        <Link href="/production" passHref>
                            <ListItem component="a" button>
                                محصولات
                            </ListItem>
                        </Link>
                        <Link href="/upload" passHref>
                            <ListItem component="a" button>
                                upload
                            </ListItem>
                        </Link>
                    </List>
                </div>
            </Drawer>
        </div>
    )
}

export default Nav