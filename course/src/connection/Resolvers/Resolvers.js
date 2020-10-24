const { Db, ObjectId } = require("mongodb")

const resolvers = {
    Query:{
        allUsers:(parent, payload,{db})=>{
            return db.collection('users').find({}).toArray()
        },
        allPost:async(_,payload,{db})=>{
            const users = await db.collection('users').find({}).toArray()
            return users[0].posts
        }
    },
    Mutation:{
        createUser:(parent, payload, {db})=>{
            const newUser ={
                ...payload.input,
                posts:[]
            }
            const users = db.collection('users')
            users.insertOne(newUser)

            return newUser
        },
        createPost:async(parent, {input}, {db})=>{
            const newPost ={
                ...input
            }
            const users = db.collection('users')


            await users.updateOne(
                {_id: ObjectId(input.userID)},
                {$push: { posts: newPost } }
            )
            return newPost
        }
    }
  
}

module.exports = resolvers