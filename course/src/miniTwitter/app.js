const express = require('express')
const {ApolloServer,gql} = require('apollo-server-express')
const { v4: uuidv4 } = require('uuid');

const app = express();

let twitts = [{
    id:1,
    text: "Texto de prueba",
    date: new Date(),
    user: 1
},
{
    id:2,
    text: "Texto de prueba 2",
    date: new Date(),
    user: 1
}
]
let users = [{
    id:1,
    name:"Juan",
    email:"jota@gmail.com",
    twits:[1,2]  
},
{
    id:2,
    name:"Dani",
    email:"dani@gmail.com",
    twits:[]
}

]

const typeDefs = gql`
  type Query{
    totalTwitts:Int!,
    allTwitts:[Twitt!]!,
    allUsers:[User!]!,
    User: User,
    Twitt: Twitt!
  }

  type Mutation{
      createTwitt(text:String!):Twitt!,
      createUser(name:String!, email:String!):User!
  }

  type User{
      id: ID!,
      name: String!
      email: String!
      twits:[Twitt!]!
  }
  
 type Twitt{
    id: ID!
    text: String!,
    date: Date,
    user: User!
 }
 scalar Date
`
const resolvers = {
    Query:{
        totalTwitts:()=> twitts.length,
        allTwitts:()=> twitts,
        allUsers:()=> users,
    },
    User:{
        twits:parent=> twitts.filter(twitt => parent.twits.includes(twitt.id))
    },
    Twitt:{
        user: parent=> users.find(user => user.id == parent.user)
    },
    Mutation:{
        createTwitt:(parent, payload)=>{
              const newTwitt ={
                  id : uuidv4(),
                  ...payload,
                  date: Date.now()
              }
              console.log("***")
              twitts.push(newTwitt)
              return newTwitt
        },
        createUser:(parent, payload)=>{
            const newUser ={
                id: uuidv4(),
                ...payload
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