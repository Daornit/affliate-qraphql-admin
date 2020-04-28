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
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';

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

function ShortPost(props) {
    const { classes, post, deleteRelation }= props;

    const mergeType = post.mergeType ? post.mergeType: 'REGULAR';
    
    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                    <Link color="inherit" href={'/admin/post/' + post._id}>
                        {post.title}
                    </Link>
                    </Typography>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            {post.shortDesc ? post.shortDesc: 'Богино хэмжээний тайлбар өгөөгүй байна.'}
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <span className={classes.short}>
                                Үүссэн огноо: {post.createdDate ? moment(post.createdDate).fromNow(): ''}
                            </span>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <span className={classes.short}>
                                Зохиолч: {post.author ? post.author.username : ''}
                            </span>
                        </GridItem>
                    </GridContainer>

                    <div className={classes.action}>
                        <span className={classes.snap}>СY {post.isCommentAble ? 'боломжтой': 'боломжгүй'}</span>
                        <span className={classes.snap}>{post.isArchived ? 'Архивлагдсан': 'Архивлагдаагүй'}</span>
                        <span className={classes.snap}>{post.type}</span>
                        {
                            props.delete ? <IconButton aria-label="delete" className={classes.button} size="small" onClick={e => props.delete(post._id)}>
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>: ''
                        }
                        {
                            deleteRelation ? <IconButton aria-label="delete" className={classes.button} size="small" onClick={e => deleteRelation(post._id, mergeType )}>
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>: ''
                        }
                    </div>
                </CardContent>
            </div>
            <CardMedia
                className={classes.cover}
                image={post.coverImg ? post.coverImg : '/cover.jpeg'}
                title="Live from space album cover"
            />
        </Card>
    );
}

ShortPost.propTypes = {
    classes: PropTypes.object.isRequired
}
const styledComp = withStyles(styles)(ShortPost);
export default styledComp;