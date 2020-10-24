const {gql} = require('apollo-server-express')

const typeDefs = gql`
type Query{
  allUsers:[User!]!
  allPost:[Post!]!
}

type Mutation{
    createUser(input: UserInput!):User!
    createPost(input: PostInput):Post!
}

input UserInput{
    user:String!
    email:String
}

input PostInput{
    title:String!
    body: String!
    published: Boolean!
    userID: String!
}

type User{
    _id: ID!,
    user: String!
    email: String!
    posts:[Post!]
}

type Post{
    _id: ID!
    title:String!
    body: String!
    user:User!
}
`

module.exports = typeDefs