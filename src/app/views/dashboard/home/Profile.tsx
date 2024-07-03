import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_BY_ID } from '../../../queries/getUserById';
import { UPDATE_NATIONALITY_BY_ID } from '../../../queries/updateNationality';
import { UPDATE_ADDRESS_BY_ID } from '../../../queries/updateAdress';
import { UPDATE_EMAIL_BY_ID } from '../../../queries/updateEmail';

export interface ProfileData {
    name: string;
    lastName: string;
    email: string;
    address: string;
    nationality: string;
}

export function Profile() {
    const [profileData, setProfileData] = useState<ProfileData>({
        name: '',
        lastName: '',
        email: '',
        address: '',
        nationality: ''
    });
    const userId = localStorage.getItem('iduser') || '';
    const { loading, error, data, refetch } = useQuery(GET_USER_BY_ID, {
        variables: { id: userId},  
    });

    useEffect(() => {
        if (data && data.getUserById) {
            const userData = data.getUserById;
            setProfileData({
                name: userData.name,
                lastName: userData.lastName,
                email: userData.email,
                address: userData.address,
                nationality: userData.nationality
            });
        }
    }, [data]);

    const [updateEmailById] = useMutation(UPDATE_EMAIL_BY_ID);
    const [updateAddressById] = useMutation(UPDATE_ADDRESS_BY_ID);
    const [updateNationalityById] = useMutation(UPDATE_NATIONALITY_BY_ID);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfileData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        // Verificar qué campos han cambiado y actualizar solo esos
        const promises = [];
        if (profileData.email !== data.getUserById.email) {
            promises.push(updateEmailById({
                variables: {
                    id: userId,
                    newEmail: profileData.email
                }
            }));
        }
        if (profileData.address !== data.getUserById.address) {
            promises.push(updateAddressById({
                variables: {
                    id: userId,
                    address: profileData.address
                }
            }));
        }
        if (profileData.nationality !== data.getUserById.nationality) {
            promises.push(updateNationalityById({
                variables: {
                    id: userId,
                    nationality: profileData.nationality
                }
            }));
        }

        try {
            // Ejecutar todas las promesas de mutación
            await Promise.all(promises);
            // Refetch data después de las mutaciones para obtener los valores actualizados
            refetch();
            console.log('Actualización exitosa');
        } catch (error) {
            console.error('Error en la actualización:', error);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica para guardar los datos del perfil
        console.log('Profile Data:', profileData);
        // Ejemplo de cómo podrías guardar en localStorage
        localStorage.setItem('userProfile', JSON.stringify(profileData));
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Perfil de Usuario</h2>
                            <Form onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group>
                                            <Form.Label><strong>Nombre</strong></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={profileData.name}
                                                onChange={handleChange}
                                                required
                                                readOnly  // Para campos que no se editarán
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label><strong>Apellidos</strong></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                value={profileData.lastName}
                                                onChange={handleChange}
                                                required
                                                readOnly  // Para campos que no se editarán
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group>
                                            <Form.Label><strong>Correo Electrónico</strong></Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={profileData.email}
                                                onChange={handleChange}
                                                readOnly // Esto hace que el campo sea de solo lectura
                                                style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }} // Ejemplo de estilo visual
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label><strong>Dirección</strong></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="address"
                                                value={profileData.address}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group>
                                            <Form.Label><strong>Nacionalidad</strong></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="nationality"
                                                value={profileData.nationality}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Button type="button" className="w-100 btn btn-primary" onClick={handleUpdate}>
                                            Actualizar Perfil
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}