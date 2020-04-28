import React from 'react';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import RefreshIcon from '@material-ui/icons/Refresh';
import Link from "@material-ui/core/Link";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import { history } from 'helpers'

//graphql
import { USER_LIST, TOGGLE_BAN_USER } from 'queries.js';
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

function ModeratorControl() {

  const classes = useStyles();
  const [ toggleBanUser ] = useMutation(TOGGLE_BAN_USER);
  const { loading, err, data, refetch } = useQuery(USER_LIST);

  if (loading) return 'Loading...';
  if (err) {
    notification.error(err.message);
    return err.message;
  };

  const handleRefresh = () => {
    refetch()
  }

  const banUserById = (id) => {
    toggleBanUser({variables: {
      userId: id
    }}).then(({data}) => {
      notification.success("Амжилттай " + (data.toggleBanUser.isBanned? "блок хийлээ": "блок цуцаллаа") )
    }).catch(err => notification.error(err.message));
  }

  let body = data.users.map(user => (
    <ListItem key={user._id}>
      
      <ListItemAvatar>
        <Avatar>
          <img src={user.avatar ? user.avatar:"/cover.jpeg"}></img>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
          primary={<Link color="inherit" href={'/admin/user/' + user._id}>{user.username}</Link>}
          secondary={user.type}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={() => banUserById(user._id)}>
          <BlockIcon color={user.isBanned ? "disabled": "primary"}/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));

  return (
    <Card>
      <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Хэрэглэгчийн жагсаалт
            <IconButton aria-label="delete" className={classes.margin} size="small" onClick={handleRefresh}>
                <RefreshIcon fontSize="inherit" />
            </IconButton>
          </h4>
      </CardHeader>
      <CardBody>
        <List className={classes.root}>
          {body}
        </List>
      </CardBody>
      <CardFooter>
        <Button color="primary" onClick={ e => {
          e.preventDefault();
          history.push('/admin/user/new')
        }}>Шинэ хэрэглэгч</Button>
      </CardFooter>
    </Card>
  )
}

export default ModeratorControl;