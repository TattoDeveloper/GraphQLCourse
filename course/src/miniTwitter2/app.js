const express = require('express')
const {ApolloServer,gql} = require('apollo-server-express')
const { v4: uuidv4 } = require('uuid');

const app = express();

let twitts = []
let users = []

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
const resolvers = {
    Query:{
        totalTwitts:()=> twitts.length,
        allTwitts:()=> twitts,
        allUsers:()=> users
    },
    Mutation:{
        createTwitt:(parent, payload)=>{
              const newTwitt ={
                  id : uuidv4(),
                  ...payload.input,
                  date: Date.now()
              }

              twitts.push(newTwitt)
              return newTwitt
        },
        createUser:(parent, payload)=>{
            const newUser ={
                id: uuidv4(),
                ...payload.input
            }
            users.push(newUser)
            return newUser
        }
    }
  
}

const server = new ApolloServer({
  typeDefs,
  resolvers
  });

 server.applyMiddleware({app});
 app.listen(3000,()=> console.info("Running....."));