import { AuthCard } from "../components/authCard/AuthCard";
import logo from '../../../assets/img/logo.png'
import accountIcon from '../../../assets/icons/account.svg'
import passwordIcon from '../../../assets/icons/password.svg'
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/contexts/AuthContext";
import { AuthService } from "../../../services/auth/AuthService";

export function Register (){

    const { distpachUser }: any = useContext(AuthContext);
    const [ auth, setAuth ] = useState({ email: '', password: ''})

    const handleSubmit = async () =>{
        try{
            const resp = await AuthService.login(auth);
        } catch (error) {

        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLFormElement | HTMLInputElement>) => {

    }



    return(
        <div>
            <AuthCard>
            <form onSubmit={handleSubmit} autoComplete="off">
        <div className="text-center mb-2">
          <img
            className="img-fluid"
            src={logo}
            alt="logo"
          />
        </div>

        <div className="mb-2 p-1 d-flex border rounded">
          <div className="mx-2 mt-1"> 
            <img 
              className="img-fluid"
              src={accountIcon}
              alt="iconUser" />
          </div>
          <input
            autoFocus
            className="form-control txt-input"
            name="correo"
            type="email"
            placeholder="gege@gege.com"
            onChange={ e => handleChange(e) }
          />
        </div>

        <div className="mb-2 p-1 d-flex border rounded">
          <div className="mx-2 mt-1"> 
            <img 
              className="img-fluid"
              src={passwordIcon}
              alt="iconUser" />
          </div>
          <input
            className="form-control txt-input"
            name="contraseña"
            type="password"
            placeholder="******"
            onChange={ e => handleChange(e) }
          />
        </div>

        <div className="row d-flex justify-content-between mt-3 mb-2">
          <div className="mb-3">
            <div className="form-check ms-1">
              <input
                type="checkbox"
                className="form-check-input"
                id="mycheckbox"
              />
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
          <Link to="/auth/recover">Olvidaste la contraseña?</Link>
        </div>

        <div className="mt-3 mb-3 text-center">
           <h6>No tienes una cuenta</h6>
          <Link to="/auth/register">Registrar</Link>
        </div>
      </form>
            </AuthCard>

        </div>
    )


}