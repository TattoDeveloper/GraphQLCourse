import { gql } from 'apollo-boost'

export const QUERY_POST = gql`
   {
    allPost{
        title,
        body, 
    }
   }
`
