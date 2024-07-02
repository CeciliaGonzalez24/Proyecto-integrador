import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../../mutations/registerMutation';
import { AuthCard } from "../components/authCard/AuthCard";
import logo from '../../../assets/img/logo.png';

const Register = () => {
  const history = useHistory();
  const [registerUser] = useMutation(REGISTER_USER);

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          lastName: "",
          email: "",
          password1: "",
          password2: ""
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, "El Nombre debe ser de al menos 2 caracteres")
            .required("Requerido"),
          lastName: Yup.string()
            .min(2, "El Apellido debe ser de al menos 2 caracteres")
            .required("Requerido"),
          email: Yup.string()
            .email("Formato de correo inválido")
            .required("Requerido"),
          password1: Yup.string()
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .required("Requerido"),
          password2: Yup.string()
            .oneOf([Yup.ref("password1")], "Las contraseñas no coinciden")
            .required("Requerido")
        })}
        onSubmit={async (values) => {
          try {
            const { data } = await registerUser({
              variables: {
                registerDto: {
                  name: values.name,
                  lastName: values.lastName,
                  email: values.email,
                  password1: values.password1,
                  password2: values.password2,
                },
              },
            });

            console.log("Usuario registrado:", data); 
            localStorage.setItem('userProfile', JSON.stringify(values));
            history.push("/dashboard/home");
          } catch (error) {
            console.error("Error al registrar usuario:", error);
          }
        }}
      >
        <Form>
          <div className="text-center mb-2">
            <img className="img-fluid" src={logo} alt="logo" />
          </div>

          <div className="mb-2">
            <label htmlFor="name">Nombre</label>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Nombre"
              className="form-control"
            />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>

          <div className="mb-2">
            <label htmlFor="lastName">Apellido</label>
            <Field
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Apellido"
              className="form-control"
            />
            <ErrorMessage name="lastName" component="div" className="text-danger" />
          </div>

          <div className="mb-2">
            <label htmlFor="email">Correo electrónico</label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Correo electrónico"
              className="form-control"
            />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>

          <div className="mb-2">
            <label htmlFor="password1">Contraseña</label>
            <Field
              type="password"
              id="password1"
              name="password1"
              placeholder="Contraseña"
              className="form-control"
            />
            <ErrorMessage name="password1" component="div" className="text-danger" />
          </div>

          <div className="mb-2">
            <label htmlFor="password2">Confirmar contraseña</label>
            <Field
              type="password"
              id="password2"
              name="password2"
              placeholder="Confirmar contraseña"
              className="form-control"
            />
            <ErrorMessage name="password2" component="div" className="text-danger" />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Registrarse
            </button>
          </div>

          <div className="mt-3 mb-3 text-center">
            <h6>¿Ya tienes una cuenta?</h6>
            <Link to="/auth/login">Iniciar Sesión</Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;