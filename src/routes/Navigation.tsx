import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  FormikAbstraction,
  FormikBasicPage,
  FormikComponents,
  FormikYupPage,
  RegisterPage,
  RegisterFormikPage,
  DynamicForm,
} from '../03-forms/pages';
import logo from '../app/assets/img/logo.png';
import { Login } from '../app/views/auth/login/Login';
import { AppRouter } from '../app/router/AppRouter';
import App from '../App';


const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const NavigationBar = styled.nav`
  width: 100%;
  background-color: #282c34;
  padding: 20px;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Logo = styled.img`
  width: 150px;
  margin-right: 200px;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 20px;
`;

const NavItem = styled.li`
  display: inline;
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 18px;

  &.nav-active {
    font-weight: bold;
    border-bottom: thick double #ff0000;
  }
`;

const WelcomeMessage = styled.h1`
  color: #282c34;
`;

export const Navigation = () => {
  return (
    <Router>
      <MainLayout>
        <NavigationBar>
          <Logo src={logo} alt="React Logo" />
          <NavList>
            <NavItem>
              <StyledNavLink to="/users" activeClassName="nav-active" exact>Inicio</StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/login" activeClassName="nav-active" exact>Iniciosesion</StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/formik-register" activeClassName="nav-active" exact>Registro</StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/formik-abstractation" activeClassName="nav-active" exact>Servicios</StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/dynamic-form" activeClassName="nav-active" exact>Comentarios</StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/" activeClassName="nav-active" exact>Salir</StyledNavLink>
            </NavItem>
          </NavList>
        </NavigationBar>

        <Switch>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/auth/login">
            <Login />
          </Route>
          <Route path="/formik-basic">
            <FormikBasicPage />
          </Route>
          <Route path="/formik-yup">
            <FormikYupPage />
          </Route>
          <Route path="/formik-components">
            <FormikComponents />
          </Route>
          <Route path="/formik-abstractation">
            <FormikAbstraction />
          </Route>
          <Route path="/formik-register">
            <RegisterFormikPage />
          </Route>
          <Route path="/dynamic-form">
            <DynamicForm />
          </Route>
          <Route path="/">
            <App/>
          </Route>
          <Route path="/">
            <WelcomeMessage>Bienvenidos!</WelcomeMessage>
          </Route>
        </Switch>
      </MainLayout>
    </Router>
  );
};
