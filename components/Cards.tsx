import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    CardActions,
    Button
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(3),
            [theme.breakpoints.only('xs')]: {

            }
        },
        title: {
            fontSize: '1.15rem'
        },
        cardButton: {
            // color: '#ffd54f'
        }
    })
)

function Cards(props: any) {
    const classes = useStyles();
    return (
        <Card
            className={classes.root}
            // raised
            elevation={8}
        >
            <CardMedia
                component="img"
                image="/static/img/firstShow.png"
                alt="مبل راحتی"
                title="مبل راحتی"
            />
            <CardContent>
                <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    className={classes.title}
                >
                    <Box>
                        {props.title}
                    </Box>
                </Typography>
                <Typography
                    variant="body2"
                    component="span"
                >
                    <Box>
                        {props.caption}
                    </Box>
                </Typography>
            </CardContent>
            <CardActions>
                <Link href={`/production/${props.link}`} passHref>
                    <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        component="a"
                        className={classes.cardButton}
                    >
                        مشاهده
                    </Button>
                </Link>
            </CardActions>
        </Card>
    )
}

export default Cards;