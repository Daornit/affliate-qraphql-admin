import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import UploadButton from "components/Upload/UploadButton.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { CREATE_USER } from 'queries.js';
import { useMutation } from '@apollo/react-hooks';
import notification from 'helpers/notification';

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
};

const useStyles = makeStyles(styles);
const initialState = {
  username: "", 
  email: "", 
  type: "ADMIN", 
  avatar: "", 
  password: ""
};

export default function NewUser() {

  const classes = useStyles();

  const [state, setState] = React.useState({...initialState})

  const [createUser] = useMutation(CREATE_USER);

  const handleChange = event => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  
  const handleAvatarChange = value => {
    setState({...state, avatar: value});
  }

  const {username, email, type, avatar, password} = state;
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Шинэ хэрэглэгч үүсгэх</h4>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  label="Хэрэглэгчийн нэр" 
                  name="username"
                  value={username}
                  onChange={handleChange}
                  fullWidth
                  className={classes.margin15}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  label="Email хаяг"
                  name="email"
                  value={email}
                  fullWidth
                  onChange={handleChange}
                  className={classes.margin15}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <FormControl className={classes.margin15}>
                  <InputLabel>Төрөл</InputLabel>
                  <Select
                    native
                    value={type}
                    onChange={handleChange}
                    fullWidth
                    inputProps={{
                      name: 'type',
                    }}
                  >
                    <option value={'ADMIN'}>ADMIN</option>
                    <option value={'MODERATOR'}>MODERATOR</option>
                    <option value={'MARKTER'}>MARKTER</option>
                  </Select>
                </FormControl>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  className={classes.margin15}
                  label="Avatar"
                  name="avatar"
                  value={avatar}
                  onChange={ e => handleAvatarChange(e.target.value) }
                />
                <UploadButton handleInput={handleAvatarChange}/>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  label="Нууц үг"
                  name="password"
                  type="password"
                  value={password}
                  fullWidth
                  onChange={handleChange}
                  className={classes.margin15}
                />
              </GridItem>
              <GridItem>
                <Button color="primary" onClick={ e => {
                    e.preventDefault()
                    console.log(state);
                    createUser({
                      variables: {
                        userInput: {
                          username: state.username,
                          avatar: state.avatar,
                          email: state.email,
                          type: state.type,
                          password: state.password
                        }
                      }
                    })
                    .then(data => {
                      notification.success("Амжилттай үүслээ");
                      setState({...initialState})
                    })
                    .catch(e => notification.error(e.message))
                  }}>Үүсгэх</Button>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
}