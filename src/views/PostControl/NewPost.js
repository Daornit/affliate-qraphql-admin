import React, { useState } from "react";

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

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import notification from 'helpers/notification';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CREATE_POST = gql`
  mutation createPost($title: String!, $description: String!, $shortDesc:String, $coverImg: String!, $type: String!, $isCommentAble: Boolean! ){
    createPost(postInput:{
      title:$title
      description:$description
      shortDesc:$shortDesc
      coverImg:$coverImg
      type:$type
      isCommentAble:$isCommentAble
    }) {
      _id
      title
    }
  }
`;


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

const initState = {
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
}

const useStyles = makeStyles(styles);

function NewPost (props) {
  const classes = useStyles();
  const [ createPost, result ] = useMutation(CREATE_POST);

  console.log("result:: ", result.data);

  const [state, setState] = useState(Object.assign({},initState));

  let refTitle;

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
      notification.error('Гарчиг-ийг заавал бөглөнө үү!'); 
      return;
    }
    let post = Object.assign({}, newPost);

    console.log(post);
    createPost({
      variables: {
        title: post.title,
        description: post.description,
        shortDesc: post.shortDesc,
        coverImg: post.coverImg,
        type: post.type,
        isCommentAble: post.isCommentAble,
      }
    });
  }

  const newPost = result.data ? result.data.createPost: false;

  const { title, type, isCommentAble, coverImg, shortDesc, description} = state;
  
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Шинэ нийтлэл үүсгэх</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  ref={refTitle}
                  label="Гарчиг" 
                  name="title"
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
                  data={description}
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
          </CardBody>
          <CardFooter>
            <Button color="primary" onClick={ e => {
              e.preventDefault();
              handleSubmit(state);
            }}>Үүсгэх</Button>
            {newPost ? <Button color="primary" onClick={ e => {
              e.preventDefault();
            }}>Урьдчилан харах</Button>: '' }
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  )
}

export default NewPost;