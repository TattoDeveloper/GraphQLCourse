import {gql} from 'apollo-boost'

export const CREATE_POST = gql`
mutation add ($input: UserInput){
    createPost(input:$input){
    title
    body
  }
}
`