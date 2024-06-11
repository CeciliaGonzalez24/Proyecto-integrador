import { useReducer } from 'react';
import { AppRouter } from './app/router/AppRouter';
import { AuthContext } from './app/views/store/contexts/AuthContext';
import { authReducer } from './app/views/store/reducers/authReducers';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import "bootstrap/dist/css/bootstrap.min.css" 

//const init = () => {
 // let sessionUser: any = sessionStorage.getItem('user');
 // let user: any;
  //if(!sessionUser){
   // user = sessionUser;
 // }else{
 //   user =JSON.parse(sessionUser);
  //}
 // return user;
//}

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {

  const [user, dispatchUser ] = useReducer(authReducer, {});


  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value = { {user, dispatchUser} }>
         <AppRouter />
      </AuthContext.Provider>
      </ApolloProvider>

  );
  
}

export default App;
