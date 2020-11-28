const express = require('express')
const {ApolloServer,gql} = require('apollo-server-express')
const { v4: uuidv4 } = require('uuid');

const app = express();

let twitts = [{
    id:1,
    text: "Texto de prueba",
    date: new Date(),
    user: 1,
    feed:[1,2,3],
},
{
    id:2,
    text: "Texto de prueba 2",
    date: new Date(),
    user: 1,
    feed:[1,2,3]
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

let comments =[
    {
      id:1,
      text: "comentario 1",
      date: Date.now()
    },
    {
        id:2,
        text: "comentario 2",
        date: Date.now()
    },
    {
        id:3,
        text: "comentario 3",
        date: Date.now()
    },
    {
        id:4,
        text: "comentario 4",
        date: Date.now()
    }
]

let likes =[
    {
        id:1,
        twitt:1,
        date: Date.now()
    },
    {
        id:2,
        twitt:2,
        date: Date.now()
    },
    {
        id:3,
        twitt:2,
        date: Date.now()
    }
]

const typeDefs = gql`
    union Feed = Like | Comment

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
    feed:[Feed!]
 }

 type Like{
    id: ID!,
    twitt: Twitt,
    date: Date!
  }
 
  type Comment{
    id: ID!,
    text: String!,
    twitt: Twitt,
    date: Date!
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
        user: parent=> users.find(user => user.id == parent.user),
        feed: parent=> {
           return likes.filter(like => like.twitt == parent.id)
                 .concat(comments.filter(comment => comment.id == parent.id))
        }
    },
    Feed:{
        __resolveType(obj,_){
           console.log(obj,'objec')
           return obj.text ? 'Comment' : 'Like'
        }
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