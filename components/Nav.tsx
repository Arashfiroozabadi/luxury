import Link from 'next/link';
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';
import Logo from './Logo';

const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection:'column',
    },
    logo:{
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
    }
});

function Nav() {
    const classes = useStyles();
    return (
        <Paper
            className={classes.root}
        >
            <div>
                <Link href="/">
                    <a
                        className={classes.logo}
                    >
                        <Logo />
                    </a>
                </Link>
            </div>

            <ul
                className={classes.navList}
            >
                <li>
                    <Link href="/production">
                        <a>محصولات</a>
                    </Link>
                </li>
                <li>

                </li>
                <li>
                    <Link href="/production">
                        <a>درباره ما</a>
                    </Link>
                </li>
            </ul>

        </Paper>
    )
}

export default Nav