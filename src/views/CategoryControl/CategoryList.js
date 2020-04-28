import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import ShortCategory from "components/Category/ShortCategory.js";
import GridContainer from "components/Grid/GridContainer.js";

import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';

//graphql
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
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

const CATEGORIES_QUERY = gql`
  query {
    categories{
      _id
      name
      isVisibleInMainMenu
      coverImg
    }
  }
`;

function CategoryList(props) {

    const classes = useStyles();

    const { loading, err, data, refetch } = useQuery(CATEGORIES_QUERY);

    if (loading) return 'Loading...';
    if (err) return notification.error(err.message);

    const handleRefresh = () => {
      console.log("refetching")
      refetch();
    }

    let fetchedData = {...data};

    const { categories } = fetchedData;
    
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Ангилал жагсаалт 
                    <IconButton aria-label="delete" className={classes.margin} size="small" onClick={handleRefresh}>
                        <RefreshIcon fontSize="inherit" />
                    </IconButton>
                    </h4>
                </CardHeader>
                <CardBody>
                    {categories.map(
                        category => <ShortCategory key={category._id} category={category}/>
                    )}
                </CardBody>
              </Card>
            </GridItem>
        </GridContainer>
    )
}

export default CategoryList;