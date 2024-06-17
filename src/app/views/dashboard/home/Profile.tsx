import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { chileData } from './Service/chileData';

export interface ProfileData {
    fullName: string;
    address: string;
    birthDate: string;
    nationality: string;
    gender: string;
    otherData: string;
    email: string;
    name: string;
    lastName: string;
    region: string;
    province: string;
    commune: string;
}


export function Profile() {
    const [profileData, setProfileData] = useState<ProfileData>({
        fullName: '',
        address: '',
        birthDate: '',
        nationality: '',
        gender: '',
        otherData: '',
        email: '',
        name: '',
        lastName: '',
        region: '',
        province: '',
        commune: ''
    });


    const [provinces, setProvinces] = useState<string[]>([]);
    const [communes, setCommunes] = useState<string[]>([]);

    useEffect(() => {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            setProfileData(JSON.parse(savedProfile));
        }
    }, []);

    useEffect(() => {
        if (profileData.region) {
            setProvinces(Object.keys(chileData[profileData.region]));
            // Al cambiar de región, si la provincia seleccionada ya no es válida, resetea a vacío
            if (!Object.keys(chileData[profileData.region]).includes(profileData.province)) {
                setProfileData(prevState => ({ ...prevState, province: '', commune: '' }));
            } else {
                setCommunes(chileData[profileData.region][profileData.province]);
                // Si la comuna seleccionada no está en la lista actual, resetea a vacío
                if (!chileData[profileData.region][profileData.province].includes(profileData.commune)) {
                    setProfileData(prevState => ({ ...prevState, commune: '' }));
                }
            }
        }
    }, [profileData.region]);

    useEffect(() => {
        if (profileData.region && profileData.province) {
            setCommunes(chileData[profileData.region][profileData.province]);
            // Si la comuna seleccionada no está en la lista actual, resetea a vacío
            if (!chileData[profileData.region][profileData.province].includes(profileData.commune)) {
                setProfileData(prevState => ({ ...prevState, commune: '' }));
            }
        }
    }, [profileData.province]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfileData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Profile Data:', profileData);
        localStorage.setItem('userProfile', JSON.stringify(profileData));
    };

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
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group>
                                            <Form.Label><strong>Apellidos</strong></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                value={profileData.lastName}
                                                onChange={handleChange}
                                                required
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
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
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
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label><strong>Fecha de Nacimiento</strong></Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="birthDate"
                                                value={profileData.birthDate}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
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
                                        <Form.Group>
                                            <Form.Label><strong>Género</strong></Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="gender"
                                                value={profileData.gender}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Seleccionar</option>
                                                <option value="Masculino">Masculino</option>
                                                <option value="Femenino">Femenino</option>
                                                <option value="Otro">Otro</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label><strong>Región</strong></Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="region"
                                                value={profileData.region}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Seleccionar</option>
                                                {Object.keys(chileData).map(region => (
                                                    <option key={region} value={region}>
                                                        {region}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label><strong>Provincia</strong></Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="province"
                                                value={profileData.province}
                                                onChange={handleChange}
                                                disabled={!profileData.region}
                                                required
                                            >
                                                <option value="">Seleccionar</option>
                                                {provinces.map(province => (
                                                    <option key={province} value={province}>
                                                        {province}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label><strong>Comuna</strong></Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="commune"
                                                value={profileData.commune}
                                                onChange={handleChange}
                                                disabled={!profileData.province}
                                                required
                                            >
                                                <option value="">Seleccionar</option>
                                                {communes.map(commune => (
                                                    <option key={commune} value={commune}>
                                                        {commune}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group>
                                            <Form.Label><strong>Cuentanos sobre ti</strong></Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="otherData"
                                                value={profileData.otherData}
                                                onChange={handleChange}
                                                
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Button type="submit" className="w-100 btn btn-primary">
                                            Guardar Perfil
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
