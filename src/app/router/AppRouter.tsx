import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthRouter } from '../views/auth/AuthRouter';
import { useContext } from 'react';
import { AuthContext } from '../views/store/contexts/AuthContext';
import { PrivateRouter } from './PrivateRouter';
import { DashboardRouter } from '../views/dashboard/DashboardRouter';
import Register from '../views/auth/register/Register';
import { Home } from '../views/dashboard/home/Home';
import  Recover  from '../views/auth/recover/Recover';
import { Store } from '../views/dashboard/home/Store';
import { Navbar } from '../views/auth/components/Navbar';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Profile } from '../views/dashboard/home/Profile';
import { ReportHome } from '../views/dashboard/home/ReportHome';
import  Reservation  from '../views/dashboard/home/Reservation';
import { SessionProvider } from 'next-auth/react'; 
import { ServiceDetail } from '../views/dashboard/home/Service/ServiceDetail';
import { ReservationConfirmation } from '../views/dashboard/home/Service/ReservationConfirmation';

interface Context {
    dispatchUser?: any;
    user?: User;
}

interface User {
    loggedIn: boolean;
}

export function AppRouter() {
    const { user }: Context = useContext(AuthContext);


    return(
        <SessionProvider session={null}> {}
            <Router>
            <Switch>
                
                <Route path ='/auth' component={AuthRouter} />
                <Route path ='/auth/register' component={Register} />
                <Route path ='/auth/recover' component={Recover} />


                    {/* Home router */}
                    {(user?.loggedIn || user) && (
                        <>
                            <Navbar />
                            <Container className="mb-4">
                                <Route path='/dashboard/home' component={Home} />
                                <Route path='/store' component={Store} />
                                <Route path='/profile' component={Profile} />
                                <Route path='/report' component={ReportHome} />
                                <Route path='/reservation' component={Reservation} />
                                <Route path='/reservationConfirmation' component={ReservationConfirmation} />
                                <Route path="/ServiceDetail/:type" component={ServiceDetail} />
                                </Container>
                        </>
                    )}

                    <Redirect to="/" />
                </Switch>
            </Router>
        </SessionProvider>
    );
}