const express = require('express')
const {ApolloServer,gql} = require('apollo-server-express')

const app = express();

const typeDefs = gql`
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

const server = new ApolloServer({
  typeDefs,
  resolvers
  });

 server.applyMiddleware({app});
 app.listen(3000,()=> console.info("Running....."));