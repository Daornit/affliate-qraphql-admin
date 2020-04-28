import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Link from "@material-ui/core/Link";

const styles = (theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        marginTop: '10px'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: '180px !important',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
    },
    action: {
        marginTop: '15px'
    },
    snap: {
        color: 'white',
        borderRadius: '5px',
        padding: '5px',
        background: '#3f51b5',
        marginRight: '10px'
    },
    button: {
        color: '#3f51b5'
    },
    floatLeft: {
        float: 'left'
    },
    floatRight: {
        float: 'right'
    },
    block: {
        display: 'block'
    },
    short: {
        color: '#263238'
    }
});

function ShortCategory(props) {
    const { classes, category }= props;

    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                    <Link color="inherit" href={'/admin/category/' + category._id}>
                        {category.name}
                    </Link>
                    </Typography>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            {category.description ? category.description: 'Тайлбар өгөөгүй байна.'}
                        </GridItem>
                    </GridContainer>
                    <div className={classes.action}>
                      <span className={classes.snap}>СY {category.isVisibleInMainMenu ? 'Үндсэн цэс': 'Үндсэн цэс биш'}</span>
                    </div>
                </CardContent>
            </div>
            <CardMedia
                className={classes.cover}
                image={category.coverImg ? category.coverImg : '/cover.jpeg'}
                title="coverImg"
            />
        </Card>
    );
}

ShortCategory.propTypes = {
    classes: PropTypes.object.isRequired
}
const styledComp = withStyles(styles)(ShortCategory);
export default styledComp;