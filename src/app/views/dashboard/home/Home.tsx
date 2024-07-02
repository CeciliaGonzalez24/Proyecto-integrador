import React, { useEffect, useState } from 'react';
import { Card, Navbar, Nav, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import { Service } from './Store'; 

export function Home() {
    const [services, setServices] = useState<Service[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const savedServices = localStorage.getItem('services');
        if (savedServices) {
            setServices(JSON.parse(savedServices));
        }
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredServices = services.filter(service => 
        service.type && service.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Buscar servicios por nombre"
                            className="me-2"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Form>
                </Container>
            </Navbar>
            <Container className="mt-5">
                <h1 className="text-center mb-4">Todos los Servicios</h1>
                {filteredServices.length > 0 ? (
                    <Row className="mt-5">
                        {filteredServices.map((service) => (
                            <Col key={service.id} md={4} className="mb-4">
                                <Card>
                                    <Card.Body>
                                        <h5 className="card-title">{service.type}</h5>
                                        <p className="card-text"><strong>Valor:</strong> {service.price}</p>
                                        <p className="card-text"><strong>Disponibilidad:</strong> {service.availability}</p>
                                        <p className="card-text">{service.summary}</p>
                                        {service.profileData.name && (
                                            <div>
                                                <p><strong>Nombre:</strong> {service.profileData.name} {service.profileData.lastName}</p>
                                                <p><strong>Región:</strong> {service.profileData.region}</p>
                                                <p><strong>Nacionalidad:</strong> {service.profileData.nationality}</p>
                                                <p><strong>Género:</strong> {service.profileData.gender}</p>
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p className="text-center text-muted">No hay servicios disponibles.</p>
                )}
            </Container>
        </div>
    );
}
