import React, {useState} from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import ShortPost from "components/Post/ShortPost.js";
import GridContainer from "components/Grid/GridContainer.js";

import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import FilterPost from './FilterPost.js';

import Pagination from '@material-ui/lab/Pagination';

//graphql
import { DELETE_POST, POSTS_QUERY_LIST } from 'queries.js';
import { useQuery, useMutation } from '@apollo/react-hooks';
import notification from 'helpers/notification';

const styles = {  
    cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  margin: {
    margin: '5px',
    color: 'inherit'
  },
  pagination: {
    marginTop: '15px',
    textAlign: 'center'
  }
}

const useStyles = makeStyles(styles);

function PostList(props = {}) {

    const classes = useStyles();

    const [filter, setFilter] = useState({
      id: '',
      author: '',
      category: props.categoryId ? props.categoryId: '',
      title: '',
      type: '',
      shortDesc: '',
      description: '',
      createdDate: '',
      updatedDate: '',
      page:1,
      limit:10,
    })
    const [ deletePost ] = useMutation(DELETE_POST);
    const { loading, err, data, refetch } = useQuery(POSTS_QUERY_LIST, {variables: filter});

    if (loading) return 'Loading...';
    if (err) {
      notification.error(err.message);
      return err.message;
    };

    const handleRefresh = (query = filter) => {
      refetch({variables: query});
    }

    const handlePageChange = (page) => {
      setFilter({...filter, page: page});
      handleRefresh({...filter});
    }

    const deleteSinglePost = (id) => {
      deletePost({
        variables: {
          postId: id
        }
      });
    }
    
    let fetchedData = {...data};

    const { posts } = fetchedData;
    
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>{ props.title ? props.title : 'Нийтлэлийн жагсаалт'}
                    {!props.categoryId ? <IconButton aria-label="delete" className={classes.margin} size="small" onClick={handleRefresh}>
                        <RefreshIcon fontSize="inherit" />
                    </IconButton>: ""}
                    </h4>
                </CardHeader>
                <CardBody>
                  { posts.docs ? <>
                    <FilterPost filter={filter} setFilter={setFilter}/>
                    {posts.docs.map(
                        post => <ShortPost key={post._id} post={post} delete={ props.categoryId ? null:deleteSinglePost} deleteRelation={props.deleteRelation ? props.deleteRelation: null}/>
                    )}
                    <div className={classes.pagination}>
                      <Pagination count={posts.totalPages} page={posts.page} onChange={(e, page) => handlePageChange(page)}/>
                    </div>
                  </> : ''}
                </CardBody>
              </Card>
            </GridItem>
        </GridContainer>
    )
}

export default PostList;