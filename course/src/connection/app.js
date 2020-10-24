const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const {MongoClient } = require('mongodb')
require('dotenv').config()

const typeDefs = require('./typeDef/typeDef')
const resolvers = require('./Resolvers/Resolvers')


async function initialized(){

  const app = express();
  const client = await new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).connect()
  const context = { db: client.db('graph')}
 const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
  });

app.get('/',(req,res)=>{
    res.send("Hi!!")
})


 server.applyMiddleware({app});
 app.listen(3000,()=> console.info(`Graph run on,Running.....${server.graphqlPath}`));
}

initialized()