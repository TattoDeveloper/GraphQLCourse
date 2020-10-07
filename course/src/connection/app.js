const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const typeDefs = require('./typeDef/typeDef')
const resolvers = require('./Resolvers/Resolvers')

const app = express();


const server = new ApolloServer({
  typeDefs,
  resolvers
  });

 server.applyMiddleware({app});
 app.listen(3000,()=> console.info("Running....."));