import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './login/Login';
import  Register from './register/Register';


export function AuthRouter(){
    return(
        <Switch>
            <Route exact path="/auth/login">
                <Login />
            </Route>
            <Route exact path="/auth/register" component={Register} />
                

            <Redirect to="/auth/login" />
        </Switch>
    )
}