import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
      marginBottom: '15px',
      width: '100%',
  },
  heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
  },
  margin15: {
      marginTop: '15px'
  }
}));

const initState = {
    title: '',
    type: 0,
    shortDesc: '',
    description: '',
    createdDate: '',
    updatedDate: '',
    page: 1,
    limit: 10
};

function FilterPost(props) {

  const classes = useStyles();
  const [state, setState] = useState({...props.filter})

  const handleChange = event => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleClear = event => {
    event.preventDefault();
    setState(Object.assign({}, initState))
  }

  const handleSearch = event => {
    event.preventDefault();
    let obj = Object.assign({}, state, {page: 1, limit: 10});
    props.setFilter(obj);
  }
  
  const { title, type, description, shortDesc, createdDate, updatedDate } = state;

  return (
    <div className={classes.root}>
        <ExpansionPanel>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Typography className={classes.heading}>Хайлт хийх</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Grid container spacing={3}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            label="Гарчиг" 
                            name="title"
                            value={title} 
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            label="Богино тайлбар" 
                            name="shortDesc"
                            value={shortDesc} 
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.margin15}>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            label="Тайлбар" 
                            name="description"
                            value={description} 
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            label="Үүсгэсэн огноо"
                            name="createdDate"
                            type="date"
                            value={createdDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.margin15}>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            label="Өөрчлөлт огноо"
                            name="updatedDate"
                            type="date"
                            value={updatedDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <FormControl>
                            <InputLabel>Төрөл</InputLabel>
                            <Select
                            native
                            value={type}
                            onChange={handleChange}
                            inputProps={{
                                name: 'type',
                            }}
                            >
                                <option value={0}></option>
                                <option value={1}>Ноорог</option>
                                <option value={2}>Нийтэлсэн</option>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container className={classes.margin15}>
                    <Grid item xs={6} sm={6} md={3}>
                        <Button variant="contained" size="small" onClick={handleSearch}>Хайх</Button>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <Button variant="contained" size="small" onClick={handleClear}>Цэвэрлэх</Button>
                    </Grid>
                </Grid>
            </Grid>
        </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
  );
}

export default FilterPost;