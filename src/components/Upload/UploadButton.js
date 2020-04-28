import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import axios from 'axios';
import url from 'url';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  margin: {
      marginTop: '20px'
  }
}));

export default function UploadButton(props) {
  const classes = useStyles();

  let handleChange = (e) => {
    const data = new FormData();
    data.append('upload', e.target.files[0]);
    data.append('ckCsrfToken', 'HtQdC43lyWhcp4VWn26l8sMADLq1mUJb0KGh5vg4')
    axios.post("/ckfinder/connector?command=QuickUpload&type=Files&responseType=json", data).then(res => {
      props.handleInput(url.parse(res.data.url).pathname)
    });
    console.log('test');
}

  return (
    <span className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        name="file"
        onChange={handleChange}
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span" className={classes.margin}>
          <PhotoCamera />
        </IconButton>
      </label>
    </span>
  );
}