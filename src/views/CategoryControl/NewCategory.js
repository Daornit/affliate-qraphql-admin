import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import UploadButton from "components/Upload/UploadButton.js";

import { useQuery, useMutation } from '@apollo/react-hooks';
import notification from 'helpers/notification';
import { CATEGORY_LIST, CREATE_CATEGORY } from 'queries.js';


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

function NewCategory (props) {
  let refName;

  const classes = useStyle();

  const initialState = {
    name: '',
    description: '',
    coverImg: '',
    parentCategory: 1,
    isVisibleInMainMenu: false,
  }
  const [state, setState] = React.useState({...initialState})

  const [ createCategory ] = useMutation(CREATE_CATEGORY);
  const { loading, err, data } = useQuery(CATEGORY_LIST);

  let fetchedCategories = {...data};
  const categoryList = fetchedCategories.categories;


  if (loading) return 'Loading...';
  if (err) {
    notification.error(err.message)
    return err.message
  }

  const handleChange = event => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleCoverImage = value => {
    setState({
      ...state,
      coverImg: value,
    });
  }

  const handleSwitch = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSubmit = newCategory => {
    if(!newCategory.name) { 
      props.errorHandle('Нэрийг заавал бөглөнө үү!'); 
      return;
    }
    let category = Object.assign({}, newCategory);
    if(category.parentCategory === 1 || category.parentCategory === '1') delete category.parentCategory;

    console.log("category:: ", category)

    createCategory({variables: category})
    .then(() => {
      notification.success("Ангилал амжилттай үүслээ!")
      setState({...initialState})
    })
    .catch(err => {
      notification.error(err.message);
    })
  }

  const { name, description, parentCategory, coverImg, isVisibleInMainMenu} = state;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Шинэ ангилал үүсгэх</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  ref={refName}
                  label="Нэр" 
                  name="name"
                  required
                  value={name} 
                  onChange={handleChange}
                  className={classes.margin15}
                  fullWidth
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  label="Тайлбар" 
                  name="description"
                  required
                  value={description} 
                  onChange={handleChange}
                  className={classes.margin15}
                  fullWidth
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <FormControl className={classes.margin15} fullWidth>
                  <InputLabel>Хамрагдах ангилал</InputLabel>
                  <Select
                    native
                    value={parentCategory}
                    onChange={handleChange}
                    inputProps={{
                      name: 'parentCategory',
                    }}
                  >
                    <option value={1}></option>
                    {categoryList.map(obj => <option key={obj._id} value={obj._id}>{obj.name}</option>)}
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                  <InputLabel shrink={true} className={classes.margin15}>Үндсэн эсэх?</InputLabel>
                  <Switch
                    checked={isVisibleInMainMenu}
                    onChange={handleSwitch}
                    name="isVisibleInMainMenu"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  label="Зураг" 
                  name="coverImg"
                  value={coverImg} 
                  onChange={e => handleCoverImage(e.target.value)}
                  className={classes.margin15}
                />
                <UploadButton handleInput={handleCoverImage}/>
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button color="primary" onClick={ e => {
              e.preventDefault();
              handleSubmit(state);
            }}>Үүсгэх</Button>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  )
}

export default NewCategory;