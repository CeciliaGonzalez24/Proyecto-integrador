import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import '../styles/styles.css';
import { MyTextInput } from '../components';
import { RegisterFormikPage } from './RegisterFormikPage';
import { Route } from 'react-router-dom';

export const LoginUser = () => {

    const handleRegisterFormikPageClick = () => {
        <Route>
            <RegisterFormikPage />
        </Route>
    }

    
    return (
        <div>
            <h1>Iniciar Sesión</h1>

            <Formik
                initialValues={{
                    email: '',
                    password1: ''
                }} 

                onSubmit={ ( values) => {
                    console.log(values)
                }}
                validationSchema={
                    Yup.object({
                        email: Yup.string()
                                        .email('Revise el formato del correo')
                                        .required('Requerido'),
                        password1: Yup.string()
                                        .min(6,'Minimo de 6 letras')
                                        .required('Requerido')
                    })
                }

            >

                <Form>

                    <MyTextInput
                        label="Correo"
                        name="email"
                        type="email"
                        placeholder="pepito@gmail.com"
                    />

                    <MyTextInput
                        label="Contraseña"
                        name="password1"
                        type="password"
                        placeholder="*****"
                    />


                    <button type="submit">Iniciar Sesión</button>
            
                    <button type="button" onClick={ handleRegisterFormikPageClick }>nuevo usuario</button>

                    
                    
                </Form>
                  
                
            </Formik>

        </div>
    )
}
