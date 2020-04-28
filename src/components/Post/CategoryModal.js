import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from "components/CustomButtons/Button.js";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import notification from 'helpers/notification';

const CATEGORY_LIST = gql`
  {
    categories {
      _id
      name
    }
  }
`;

const CATEGORY_RELATION = gql`
  mutation categoryRelation($postId: ID!) {
    postAndCategories(postId: $postId){
      _id
      type
      category {
        _id
        name
      }
    }
  }
`;

const DELETE_RELATION = gql`
  mutation deleteRelation($id: ID!){
    deleteRelation(id: $id){
      _id
    }
  }
`;

const POST_ADD_TO_CATEGORY = gql`
  mutation addPostToCategory($postId: ID!, $categoryId: ID!, $type: String!){
  addPostToCategory(
    postId: $postId,
    categoryId: $categoryId, 
    type:$type){
    category{
      name
    }
  }
}
`

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  margin: {
    marginBottom: "10px"
  },
  button:{
    color: "#bf360c",
    margin: 0
  },
  spanCategory: {
    color: 'white',
    borderRadius: '5px',
    padding: '5px',
    background: '#3f51b5',
    marginRight: '10px'
  },
  formControl: {
    margin: '10px 10px'
  }
}));

export default function CategoryModal(props) {

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [state, setState] = React.useState({
    open: false,
    openCat: false,
    openType: false,
    id: '',
    categoryId: '',
    type: 'REGULAR',
    loadingPostAndCategory: false,
    postAndCategories: []
  });
  const [categoryRelation] = useMutation(CATEGORY_RELATION);
  const [addPostToCategory] = useMutation(POST_ADD_TO_CATEGORY);
  const [deleteRelation] = useMutation(DELETE_RELATION);

  const refetch = () => {
    categoryRelation({variables: {
      postId: props.postId
    }}).then(({data}) => {
      setState({
        ...state, postAndCategories: data.postAndCategories, loadingPostAndCategory: false});
    })
  }
  React.useEffect(() => {
    if(props && props.postId) {
      refetch()
    };
  }, [props])

  const classes = useStyles();

  const { loading, err, data } = useQuery(CATEGORY_LIST);

  let fetchedCategories = {...data};
  const categoryList = fetchedCategories.categories;

  if (loading) return 'Loading...';
  if (err) {
    notification.error(err.message)
    return err.message
  }

  const handleOpen = () => {
    setState({ ...state, open: true});
  };

  const handleOpenSelectCat = () => {
    setState({ ...state, openCat: true});
  };

  const handleCloseCat = () => {
    setState({ ...state, openCat: false});
  };

  const handleOpenSelectType = () => {
    setState({ ...state, openType: true});
  };

  const handleCloseType = () => {
    setState({ ...state, openType: false});
  };

  const handleClose = () => {
    setState({ ...state, open: false});
  };

  const handleChangeCategory = (event) => {
    setState({ ...state, categoryId: event.target.value});
  };

  const handleChangeType = (event) => {
    setState({ ...state, type: event.target.value});
  };

  const handleCategoryAdd = () => {
    console.log(state);
    addPostToCategory({
      variables: {
        postId: props.postId,
        categoryId: state.categoryId,
        type: state.type,
      }
    }).then(({data}) => {
      setState({
        ...state,
        categoryId: '',
        type: 'REGULAR', 
      });
      refetch();
      handleClose(); 
    }).catch(err => {
      notification.error(err.message)
      return err.message
    })
  }

  const handleDeleteRelation = id => {
    deleteRelation({variables: {
      id: id
    }}).then(data=> {
      refetch();
    })
  }

  const postAndCategories = [...state.postAndCategories];

  return (
    <div>
      <div className={classes.margin}>
        {postAndCategories.map(postAndCategory => 
                <span className={classes.spanCategory} key={postAndCategory._id}>{postAndCategory.category.name} - {postAndCategory.type}
                  <IconButton aria-label="delete" 
                    color="primary" 
                    className={classes.button} size="small" 
                    onClick={e => handleDeleteRelation(postAndCategory._id)}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </span>
        )}
      </div>

      <Button color="primary" size="sm" onClick={ e => {
        e.preventDefault();
        handleOpen()
      }}>Ангилал нэмэх</Button>

      <Modal
        open={state.open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {state.loadingPostAndCategory ? <div/>:
        <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">Ангилал нэмэх</h3>
            <div>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="demo-controlled-open-select-label">Ангилал сонгох</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={state.openCat}
                  onClose={handleCloseCat}
                  onOpen={handleOpenSelectCat}
                  value={state.categoryId}
                  onChange={handleChangeCategory}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categoryList.map(category => <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>)}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="demo-controlled-open-select-label">Төрөл</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={state.openType}
                  onClose={handleCloseType}
                  onOpen={handleOpenSelectType}
                  value={state.type}
                  onChange={handleChangeType}
                >
                  <MenuItem value={'REGULAR'}>REGULAR</MenuItem>
                  <MenuItem value={'TREND'}>TREND</MenuItem>
                  <MenuItem value={'POPULAR'}>POPULAR</MenuItem>
                  <MenuItem value={'RATED'}>RATED</MenuItem>
                </Select>
              </FormControl>
            </div>

            <Button color="primary" size="sm" onClick={ e => {
              e.preventDefault();
              if(state.categoryId === "") return;
              handleCategoryAdd();
            }}>Ангилал нэмэх</Button>
          </div>}
      </Modal>
    </div>
  );
}