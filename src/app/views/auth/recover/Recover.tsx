import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

export const REQUEST_RESET_PASSWORD = gql`
  mutation RequestResetPassword($email: String!) {
    requestResetPassword(requestResetPasswordDto: { email: $email })
  }
`;

const Recover = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [requestResetPassword] = useMutation(REQUEST_RESET_PASSWORD);
  console.log(email)
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await requestResetPassword({
        variables: { email },
      });

      if (data && data.requestResetPassword === 'Email sent') {
        setSuccessMessage('Email enviado');
      }
    } catch (error) {
      setErrorMessage('Error al recuperar contraseña');
      console.error('Error al recuperar contraseña', error);
    }
  };

  return (
    <div>
      <h2>Request Password Reset</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Request Reset</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default Recover;