import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import ShortPost from "components/Post/ShortPost.js";
import GridContainer from "components/Grid/GridContainer.js";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  margin: {
    margin: '5px',
    color: 'inherit'
  },
  margin15: {
    marginTop: '15px',
    marginBottom: '10px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const useStyle = makeStyles(styles);

function ListCategory(props){

  const classes = useStyle();
  const {title ,posts}= props;

  return (
    <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>{title}</h4>
            </CardHeader>
            <CardBody>
              {posts.map(
                  post => <ShortPost key={post._id + post.mergeType} post={post} deleteRelation={props.deleteRelation}/>
              )}
            </CardBody>
          </Card>
        </GridItem>
    </GridContainer>
  )
}

export default ListCategory;