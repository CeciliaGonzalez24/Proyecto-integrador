import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './login/Login';
import  Register from './register/Register';
import Recover from './recover/Recover';


export function AuthRouter(){
    return(
        <Switch>
            <Route exact path="/auth/login">
                <Login />
            </Route>
            <Route exact path="/auth/register" component={Register} />
            <Route exact path="/auth/recover" component={Recover} />
                

            <Redirect to="/auth/login" />
        </Switch>
    )
}