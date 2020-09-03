const express = require('express')
const {ApolloServer,gql} = require('apollo-server-express')

const app = express();

const typeDef = gql`
  type Query{
    me: User
  }
  
 type User{
    id: ID!
    name: String!
 }
`
const resolvers = {
    Query:{
        me:()=> {
            return {
               name:'Developer'
            }
        }
    }
}