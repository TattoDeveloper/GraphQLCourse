import './App.css';
import { ApolloProvider } from '@apollo/react-hooks'
import {client} from './client'
import { PostList } from './components/Posts/PostList';
import { UserList } from './components/Users/UsersList';


function App() {
  return<ApolloProvider client={client}>
       <div className='wrapper'>
         <PostList/>
         <UserList/>
       </div>
  </ApolloProvider>
}

export default App;
