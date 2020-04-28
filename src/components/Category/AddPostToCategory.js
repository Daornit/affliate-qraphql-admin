import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import notification from 'helpers/notification';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initState = {
  open: false,
  value: null,
  type: 'REGULAR'
};

export default function AddPostToCategory (props = {}){
  let autoCompleteRef;

  const [state, setState] = React.useState({...initState})

  const handleClickOpen = () => {
    setState({open: true});
  };
    
  const handleClose = () => {
    setState({open: false});
  };

  const handleSubmit = () => {
    if(!state.value) { 
      notification.error('Заавал нэг нийтлэл сонгосон байх шаардлагатай');
      return;
    }

    props.addPostToCategory(state.value._id, state.type);
    setState(Object.assign({}, initState));
    handleClose();
  }

  const handleChange = (e, value) => {
    setState({...state, value})
  }

  const handleTypeChange = (e) => {
    console.log(e.target.value)
    setState({...state, type: e.target.value});
  }

  const { postList } = props;

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Нийтлэл нэмэх
      </Button>
      <Dialog
        open={state.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Нийтлэл нэмэх"}</DialogTitle>
        <DialogContent>
            <Autocomplete
                id="combo-box-demo"
                ref={autoCompleteRef}
                onChange={handleChange}
                options={postList}
                disableClearable
                getOptionLabel={option => option.title}
                style={{ width: 300 }}
                renderInput={params => <TextField 
                        {...params} 
                        label="Нийтлэл сонгох" 
                        variant="outlined"
                    />}
            />
            <FormControl fullWidth>
              <Select
                native
                value={state.type}
                onChange={handleTypeChange}
              >
                <option value={'REGULAR'}>REGULAR</option>
                <option value={'TREND'}>TREND</option>
                <option value={'POPULAR'}>POPULAR</option>
                <option value={'RATED'}>RATED</option>
              </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Хаах
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Нэмэх
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}