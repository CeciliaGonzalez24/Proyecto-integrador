import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../store/contexts/AuthContext';
import { LOGIN_MUTATION } from '../../../mutations/loginMutation';
import { useMutation } from '@apollo/client';
import { AuthCard } from '../components/authCard/AuthCard';
import logo from '../../../assets/img/logo.png';
import accountIcon from '../../../assets/icons/account.svg';
import passwordIcon from '../../../assets/icons/password.svg';

interface LoginDto {
  email: string;
  password: string;
}

export function Login() {
  const { dispatchUser }: any = useContext(AuthContext);
  const [auth, setAuth] = useState<LoginDto>({ email: '', password: '' });
  const history = useHistory();

  const [loginMutation] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      console.log('Login successful:', data);
      const { id, token } = data.login;
      localStorage.setItem('iduser', id);
      localStorage.setItem('token', token); 
      sessionStorage.setItem('user', JSON.stringify({ email: data.login.email, loggedIn: true }));
      dispatchUser({ type: 'login', payload: { email: data.login.email } });
      history.replace('/dashboard/home');
    },
    onError: (error) => {
      console.error('Error on login:', error);
      alert('Error al iniciar sesión. Por favor verifica tus credenciales.');
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { email, password } = auth;
      const response = await loginMutation({
        variables: { loginDto: { email, password } },
      });
      console.log('Login response:', response);
    } catch (error) {
      console.error('Error on login:', error);
      alert('Error al iniciar sesión. Por favor verifica tus credenciales.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuth({
      ...auth,
      [name]: value,
    });
  };

  return (
    <div>
      <AuthCard>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="text-center mb-2">
            <img className="img-fluid" src={logo} alt="logo" />
          </div>

          <div className="mb-2 p-1 d-flex border rounded">
            <div className="mx-2 mt-1">
              <img className="img-fluid" src={accountIcon} alt="iconUser" />
            </div>
            <input
              autoFocus
              className="form-control txt-input"
              name="email"
              type="email"
              placeholder="gege@gege.com"
              onChange={handleChange}
            />
          </div>

          <div className="mb-2 p-1 d-flex border rounded">
            <div className="mx-2 mt-1">
              <img className="img-fluid" src={passwordIcon} alt="iconUser" />
            </div>
            <input
              className="form-control txt-input"
              name="password"
              type="password"
              placeholder="******"
              onChange={handleChange}
            />
          </div>

          <div className="row d-flex justify-content-between mt-3 mb-2">
            <div className="mb-3">
              <div className="form-check ms-1">
                <input type="checkbox" className="form-check-input" id="mycheckbox" />
                <label className="form-check-label" htmlFor="mycheckbox">
                  Recordar
                </label>
              </div>
            </div>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Iniciar Sesión
            </button>
          </div>

          <div className="mt-3 mb-3 text-center">
            <Link to="/auth/recover">¿Olvidaste la contraseña?</Link>
          </div>

          <div className="mt-3 mb-3 text-center">
            <h6>¿No tienes una cuenta?</h6>
            <Link to="/auth/register">Registrar</Link>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}