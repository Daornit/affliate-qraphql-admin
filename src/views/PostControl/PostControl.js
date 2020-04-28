import React from "react";
import PropTypes from 'prop-types';

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


// core components
import GridContainer from "components/Grid/GridContainer.js";
import NewPost from "./NewPost";
import PostList from "./PostList";

const styles = theme =>  ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

class PostControl extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: 0
    }
    this.handleTabChange = this.handleTabChange.bind(this);
  }
  handleTabChange = (newValue) => {
    this.setState({value: newValue});
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <GridContainer>
        <Tabs
          value={value}
          onChange={(e, newValue) => {this.handleTabChange(newValue)}}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          <Tab icon={<ListAltIcon />} aria-label="phone" {...a11yProps(0)} />
          <Tab icon={<AddCircleIcon />} aria-label="favorite" {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0} className={classes.root}>
          <PostList/>
        </TabPanel>
        <TabPanel value={value} index={1} className={classes.root}>
          <NewPost/>
        </TabPanel>
      </GridContainer>
    );
  }
}

const styledComp = withStyles(styles)(PostControl);
export default styledComp;