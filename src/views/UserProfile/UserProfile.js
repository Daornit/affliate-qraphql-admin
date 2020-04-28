import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";

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
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

import { ME, UPDATE_PROFILE } from 'queries.js';
import { useQuery, useMutation } from '@apollo/react-hooks';
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

function FormComponent(props) {

  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const classes = useStyles();

  const [state, setState] = useState({...props, password: ""});
  
  useEffect(() => {
    console.log('props changed', props);
    setState({...props, password: ""})
  }, [props])

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

  const handleSwitch = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const {_id, username, email, type, isBanned, avatar, password } = state;
  return (
    <GridItem xs={12} sm={12} md={12}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <TextField
            label="Хэрэглэгчийн нэр" 
            name="username"
            value={username}
            onChange={handleChange}
            className={classes.margin15}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <TextField
            label="Email хаяг"
            name="email"
            value={email}
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
        <GridItem xs={12} sm={12} md={6}>
            <InputLabel shrink={true} className={classes.margin15}>Is Banned</InputLabel>
            <Switch
              checked={isBanned}
              onChange={handleSwitch}
              name="isBanned"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
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
            label="Нууц үг солих"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            className={classes.margin15}
          />
        </GridItem>
        <GridItem>
          <Button color="primary" onClick={ e => {
              e.preventDefault()
              console.log(state);
              updateProfile({
                variables: {
                  userId:_id,
                  updateData: {
                    username: state.username,
                    avatar: state.avatar,
                    email: state.email,
                    type: state.type,
                    isBanned: state.isBanned,
                    password: state.password
                  }
                }
              })
              .then(data => {
                notification.success("Амжилттай шинжлэгдлээ")
              })
              .catch(e => notification.error(e.message))
            }}>Засах</Button>
        </GridItem>
      </GridContainer>
    </GridItem>
  )
}

export default function UserProfile() {

  const match = useRouteMatch('/admin/user/:id');

  console.log("match::", match);

  const classes = useStyles();

  const { loading, err, data } = useQuery(ME, {variables: {
    id: match ? match.params.id: ""
  }});

  if (loading) return 'Loading...';
  if (err) return notification.error(err.message);

  let fetchedData = {...data};

  const {username, type, avatar} = fetchedData.me;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Хувийн мэдээлэл засах</h4>
              <p className={classes.cardCategoryWhite}>Хувийн мэдээлэл бүтэн оруулна уу!</p>
            </CardHeader>
            <CardBody>
              <FormComponent {...fetchedData.me}/>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>{username}</h4>
              <h6 className={classes.cardCategory}>{type}</h6>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}