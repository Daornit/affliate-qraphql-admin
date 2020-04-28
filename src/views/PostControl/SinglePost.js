import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
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
import CategoryModal from "components/Post/CategoryModal.js";

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//graphql
import { useQuery, useMutation } from '@apollo/react-hooks';
import { history, notification } from 'helpers';
import { UPDATE_POST, DELETE_POST, POSTS_QUERY} from 'queries.js';

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
}

let useStyles = makeStyles(styles);

function SinglePost(props) {

  const classes = useStyles();
  const match = useRouteMatch('/admin/post/:id');
  const [ deletePost ] = useMutation(DELETE_POST);
  const [ updatePost ] = useMutation(UPDATE_POST);

  const [state, setState] = useState({});

  const { loading, err, data, refetch } = useQuery(POSTS_QUERY, {variables: {
    id: match.params.id
  }});

  useEffect(() => {
    console.log('data changed', data);
    if(!data) setState({
      title: '',
      description: '<h1>Here is your content.</h1>',
      type: 'DRAFT',
      rate: [],
      ads: [],
      coverImg: '',
      shortDesc: '',
      keywordForSEO: [],
      comments: [],
      isCommentAble: false,
      isArchived: false,
    })
    else setState({...data.posts.docs[0]})
  }, [data])

  if (loading) return 'Loading...';
  if (err) return notification.error(err.message);

  let refTitle;

  const deleteSinglePost = (id) => {
    deletePost({
      variables: {
        postId: id
      }
    }).then(data =>{
      history.push('/admin/post');
    }).catch(e => {
      console.log(e);
    });
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

  const handleSubmit = newPost => {
      if(!newPost.title) { 
        props.errorHandle('Гарчиг-ийг заавал бөглөнө үү!'); 
        return;
      }
      let post = Object.assign({}, newPost);
      console.log(post);
      updatePost({variables: post}).then(()=> refetch()).catch(e=>console.log(e));
    }
    
    const { title, description, type, isCommentAble, isArchived, coverImg, shortDesc} = state;

    console.log("description", description);
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Нийтлэл</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    ref={refTitle}
                    label="Гарчиг" 
                    name="title"
                    required
                    value={title} 
                    onChange={handleChange}
                    className={classes.margin15}
                    fullWidth
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="Товч тайлбар" 
                    name="shortDesc"
                    value={shortDesc} 
                    onChange={handleChange}
                    className={classes.margin15}
                    fullWidth
                  />
                </GridItem>
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
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CKEditor
                    editor={ ClassicEditor }
                    data={data.posts.docs[0] ? data.posts.docs[0].description : state.description}
                    config={{
                      plugin: ['CKFinder'],
                      toolbar: [ 
                        'ckfinder', 'heading', '|', 
                        'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 
                        'imageUpload', 'blockQuote', 'insertTable', 'insertMedia', 'undo', 'redo'],
                      ckfinder: {
                      // Upload the images to the server using the CKFinder QuickUpload command.
                        uploadUrl: '/ckfinder/connector?command=QuickUpload&type=Files&responseType=json',
                        options: {
                            resourceType: 'Images'
                        }
                      }
                    }}
                    onInit={ editor => {
                    } }
                    onChange={ ( event, editor ) => {
                        const description = editor.getData();
                        setState({ ...state, description: description});
                    } }
                    onBlur={ ( event, editor ) => {
                    } }
                    onFocus={ ( event, editor ) => {
                    } }
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
                      <option value={'DRAFT'}>DRAFT</option>
                      <option value={'PUBLISHED'}>PUBLISHED</option>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <InputLabel shrink={true} className={classes.margin15}>Сэтгэгдэл хүлээн авах эсэх?</InputLabel>
                    <Switch
                      checked={isCommentAble}
                      onChange={handleSwitch}
                      name="isCommentAble"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel shrink={true} className={classes.margin15}>Хамрагдах ангиллууд</InputLabel>
                  {/* category list */}
                  {state._id ? <CategoryModal postId={state._id}/>: ""}
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel shrink={true} className={classes.margin15}>Архивлах статус</InputLabel>
                  <Switch
                    checked={isArchived}
                    onChange={handleSwitch}
                    name="isArchived"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={ e => {
                e.preventDefault();
                handleSubmit(state);
              }}>Засах</Button>
              <Button color="primary" onClick={ e => {
                e.preventDefault();
              }}>Урьдчилан харах</Button>
              <Button color="danger" onClick={ e => {
                e.preventDefault();
                console.log(state._id)
                deleteSinglePost(state._id);
              }}>Устгах</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    )
}

export default SinglePost;