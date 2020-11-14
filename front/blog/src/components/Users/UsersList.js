import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import { CREATE_POST } from '../../Mutations/Mutations'
import style from './user.module.css'

const User=({})=>{

}

export const UserList=()=>{
  
   const [createPost,{data}] = useMutation(CREATE_POST)

   const save=(e)=>{
      e.preventDefault()
      const elements = e.target.elements
       console.log(createPost)
      try{
      //   createPost({variables: {
      //     title: elements[0].value,
      //     body:elements[1].value,
      //     published: true,
      //     userID:"5f946339021e066420d2c87f"
      // }})
      }catch(e){
         console.log(e)
      }
   }

  return(
    <aside className={style.aside}>
      <h3>Formulariio</h3>
      <form onSubmit={save}>
         <input className={style.input} type="text" placeholder="Título del post" />
         <textarea className={style.area} placeholder="Cuerpo del texto"></textarea>
         <input className={style.button} type="submit" />
      </form>
    </aside>
  )
}