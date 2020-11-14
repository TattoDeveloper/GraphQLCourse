import {gql} from 'apollo-boost'

export const CREATE_POST = gql`
mutation createPost($title: String,$body:String,$published:Boolean, $userID:ID){
    createPost(input:{
      title:"$title",
      body: "$body",
      published:"$published",
      userID:"$userID"
    }){
    title
    body
  }
}
`