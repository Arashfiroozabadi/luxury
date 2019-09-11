import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        padding: '5px',
        textAlign: 'left',
    },
    logo: {
        color: "gold",
        fontSize: '3rem'
    }
});

const Logo = ({ textClass }: any) => {

    const classes = useStyles();
    return (
        <div
            className={classes.root}
        >
            <Typography
                variant="h1"
                component="h1"
                className={`${classes.logo} ${textClass ? textClass : null}`}
                gutterBottom
            >
                Luxury
        </Typography>
        </div >
    )
}

export default Logo