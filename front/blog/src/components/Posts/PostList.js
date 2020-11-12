import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import { QUERY_POST } from '../../query/query'
import style from './posts.module.css'

export const Post=({title,body})=>(
    <article className={style.article}>
        <h2>{title}</h2>
        <div>
            <p>{body}</p>
        </div>
    </article>
)


export const PostList=()=>{
    
    const {loading, error, data } = useQuery(QUERY_POST)

    return<section className={style.section}>
        { error ?
          (<span>Lo sentimos ha sucedido un error</span>) :
          (<>
            {
              loading ? (<p>Cargando...</p>):
              (<>
               {
                  data.allPost.map(element=>{
                      return<Post {...element}/>
                  }) 
               }
              </>)
            }
          </>)
        }
    </section>
}