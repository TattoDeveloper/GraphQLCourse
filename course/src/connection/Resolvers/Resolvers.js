const { ObjectId } = require("mongodb")

const resolvers = {
    Query:{
        allUsers:(parent, payload,{db})=>{
            return db.collection('users').find({}).toArray()
        },
        allPost:async(_,payload,{db})=>{
            const users = await db.collection('users').find({}).toArray()
            const allPost = []
           users.forEach(user=>{
               if(user.posts){
                user.posts.forEach(post =>{
                    allPost.push(post)
                })
               }
            })
            return allPost
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
            const upt = await users.updateOne(
                {_id: ObjectId(input.userID)},
                {$push: { posts: newPost } }
            )
            
            console.log(upt)

            return newPost
        }
    }
  
}

module.exports = resolvers