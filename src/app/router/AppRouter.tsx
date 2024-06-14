import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { AuthRouter } from "../views/auth/AuthRouter"
import { useContext } from "react"
import { AuthContext } from "../views/store/contexts/AuthContext"
import { PrivateRouter } from "./PrivateRouter"
import { DashboardRouter } from "../views/dashboard/DashboardRouter"
import { Register } from "../views/auth/register/Register"
import { RegisterPage } from "../../03-forms/pages"
import { Home } from "../views/dashboard/home/Home"
import { Navigation } from "../../routes/Navigation"
import { Recover } from "../views/auth/recover/Recover"
import { Store } from "../views/dashboard/home/Store"
import { Navbar } from "../views/auth/components/Navbar"
import { Container } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { Profile } from "../views/dashboard/home/Profile"
import { ReportHome } from "../views/dashboard/home/ReportHome"

interface Context {
    dispatchUser?: any,
    user?: User

}

interface User{
    loggedIn: boolean
}

export function AppRouter(){

    const { user }: Context = useContext(AuthContext);


    return(
        <Router>
            <Switch>
                <Route path ='/auth' component={AuthRouter} />
                <Route path ='/auth/register' component={Register} />
                <Route path ='/03-forms/pages' component={RegisterPage} />
                <Route path ='/routes' component={Navigation} />
                <Route path ='/auth/recover' component={Recover} />

                {/*  Home router */}
                {(user?.loggedIn || user) && (
                    <>
                    <Navbar />
                    <Container className="mb-4">
                        <Route path ='/dashboard/home' component={Home} />
                        <Route path ='/store' component={Store} />
                        <Route path ='/profile' component={Profile} />
                        <Route path ='/report' component={ReportHome} />
                        
                    </Container>
                    </>

                )}
                

                <PrivateRouter 
                    loggedIn={user?.loggedIn}
                    component={DashboardRouter}
                />
                
                <Redirect to="/dashboard/home" />
            </Switch>
        </Router>
    )
}