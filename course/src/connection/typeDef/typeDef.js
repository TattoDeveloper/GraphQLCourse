const {gql} = require('apollo-server-express')

const typeDefs = gql`
type Query{
  totalTwitts:Int!,
  allTwitts:[Twitt!]!,
  allUsers:[User!]!
}

type Mutation{
    createTwitt(input: TwittInput!):Twitt!,
    createUser(input: UserInput!):User!
}

input UserInput{
    name:String!
    email:String
}

type User{
    id: ID!,
    name: String!
    email: String!
    twitts:[Twitt!]!
}

enum TwittCategory{
  DEFAULT
  POLITICAL
  ARTISTIC
  SPORT
}

input TwittInput{
   text: String!
   category: TwittCategory=DEFAULT
}

type Twitt{
  id: ID!
  text: String!
  date: Date
  creator: User!
  category: TwittCategory
}
scalar Date
`

module.exports = typeDefs