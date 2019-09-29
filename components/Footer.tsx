import {
    Grid,
    Container
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            height: 240,
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.common.white,
            [theme.breakpoints.only('xs')]: {
                width: '100%',
            },
        },
    }),
);


function Footer() {
    const classes = useStyles();
    return (
        <footer>
            <div
                className={classes.root}
            >
                <Grid
                    container
                >
                    <Container>
                        <Grid
                            item
                        >
                            <h1>footer</h1>
                        </Grid>
                    </Container>

                </Grid>
            </div>

        </footer>
    )
}

export default Footer;