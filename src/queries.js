import gql from 'graphql-tag';

export const ME = gql`
  query me($id: ID){
    me (id: $id){
      _id
      username
      avatar
      email
      type
      isBanned
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($userInput: UserInput!){
    createUser(userInput:$userInput){
      _id
      username
      avatar
      email
      type
      isBanned
    }
  }
`;
export const UPDATE_PROFILE = gql`
  mutation updateProfile($userId: String! $updateData: UpdateUserInput!){
    updateUser(
    userId: $userId,
    updateUserInput: $updateData) {
      _id
      username
      avatar
      email
      type
      isBanned
    }
  }
`;

export const TOGGLE_BAN_USER = gql`
  mutation toggleBanUser($userId: String!){
    toggleBanUser(userId: $userId) {
      _id	
      isBanned
    }
  }
`;
export const USER_LIST = gql`
  query {
    users {
      _id
      avatar
      username
      type
      isBanned
    }
  }
`;

export const TITLE_POSTS_LIST = gql`
  query {
    postsList {
      _id
      title
    }
  }
`;
export const REMOVE_POST_FROM_CATEGORY = gql`
  mutation removePostFromCategory($postId: ID!, $categoryId: ID!, $type: String!){
    removePostFromCategory(
      postId:$postId 
      categoryId:$categoryId 
      type:$type)
    {
      _id
      type
    }
  }
`;

export const ADD_POST_TO_CATEGORY = gql`
  mutation addPostToCategory($postId: ID!, $categoryId: ID!, $type: String!){
    addPostToCategory(
      postId:$postId
      categoryId:$categoryId
      type:$type)
    {
      _id
      type
      post{
        _id
        title
        shortDesc
        coverImg
        type
        createdDate
        isCommentAble
        isArchived
        mergeType
        author {
          _id
          username
        }
      }
    }
  }
`;
export const POSTS_QUERY_LIST = gql`
  query retrievePosts(
      $id: ID, 
      $author: String,
      $category: String,
      $title: String,
      $shortDesc: String,
      $description: String,
      $type: String,
      $createdDate: String,
      $updatedDate: String,
      $page: Int!
      $limit: Int!
    ){
    posts (
      id: $id,
      author: $author,
      category: $category,
      title: $title,
      shortDesc: $shortDesc,
      description: $description,
      type: $type,
      createdDate: $createdDate,
      updatedDate: $updatedDate,
      page: $page,
      limit: $limit,
    ){
      docs {
        _id
        title
        shortDesc
        coverImg
        type
        createdDate
        isCommentAble
        isArchived
        author {
          _id
          username
        }
      }
      totalDocs
      limit
      totalPages
      page
      pagingCounter
      hasPrevPage
      hasNextPage
    }
  }
`;

export const POSTS_QUERY = gql`
  query retrievePosts(
      $id: ID
    ){
    posts (
      id: $id
    ){
      docs {
        _id
        title
        description
        shortDesc
        coverImg
        type
        createdDate
        isCommentAble
        isArchived
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: String!){
    deletePost(postId:$postId){
      _id
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost(
    $_id:ID!
    $title: String
    $description: String
    $shortDesc: String
    $coverImg: String
    $type: String
    $createdDate: String
    $updatedDate: String
    $isCommentAble: Boolean
    $isArchived: Boolean
  ){
    updatePost(
      postId: $_id
      postInput:{
        title: $title
        description: $description
        shortDesc: $shortDesc
        coverImg: $coverImg
        type: $type
        rate: null
        ads: null
        keywordForSEO: null
        createdDate: $createdDate
        updatedDate: $updatedDate
        isCommentAble: $isCommentAble
        isArchived: $isArchived
      }
  ){
    _id
  }
}`;

export const CATEGORY_ID = gql`
  query categoryById($id: ID){
    categories(id: $id){
      _id
      name
      coverImg
      description
      isVisibleInMainMenu
      parentCategory{
        _id
      }
      trendPosts {
        _id
        title
        shortDesc
        coverImg
        type
        createdDate
        isCommentAble
        isArchived
        mergeType
        author {
          _id
          username
        }
      }
      popularPosts {
        _id
        title
        shortDesc
        coverImg
        type
        createdDate
        isCommentAble
        isArchived
        mergeType
        author {
          _id
          username
        }
      }
      ratedPosts {
        _id
        title
        shortDesc
        coverImg
        type
        createdDate
        isCommentAble
        isArchived
        mergeType
        author {
          _id
          username
        }
      }
    }
  }
`;

export const CATEGORY_LIST = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory(
    $_id: String!
    $name: String! 
    $coverImg: String
    $description: String
    $parentCategory: String
    $isVisibleInMainMenu: Boolean!
  ){
    updateCategory(
      categoryId: $_id
      categoryInput:{
        name:$name
        coverImg: $coverImg
        description: $description
        parentCategory: $parentCategory
        isVisibleInMainMenu: $isVisibleInMainMenu
      }){ 
        _id
      }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation createCategory(
    $name: String! 
    $coverImg: String
    $description: String
    $parentCategory: String
    $isVisibleInMainMenu: Boolean!
  ){
    createCategory(categoryInput:{
      name:$name
      coverImg: $coverImg
      description: $description
      parentCategory: $parentCategory
      isVisibleInMainMenu: $isVisibleInMainMenu
    }){ 
      _id
    }
  }
`
