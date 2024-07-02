
import React, { useEffect, useState } from 'react';
import { Card, Navbar, Form, FormControl, Container, Row, Col, Button } from 'react-bootstrap';
import { Service } from './Store'; 
import { useHistory } from 'react-router-dom';
import './Home.css'; 

export function Home() {
    const [services, setServices] = useState<Service[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const history = useHistory();

    useEffect(() => {
        const savedServices = localStorage.getItem('services');
        if (savedServices) {
            setServices(JSON.parse(savedServices));
        }
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleServiceClick = (type: string) => {
        history.push(`/ServiceDetail/${type}`); // Convertimos el id a string
    };

    const filteredServices = services.filter(service => 
        service.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedServices = [...services].sort((a, b) => b.requestCount - a.requestCount);
    const topServices = sortedServices.slice(0, 3);

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Form className="d-flex search-bar">
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
                <h1 className="text-center mb-4">Top Servicios</h1>
                <p className="text-center mb-4 text-muted">
                Todo lo que buscas, en un solo lugar.
                Soluciones perfectas para ti
                    </p>
                <Row className="top-services mt-5">
                    {topServices.map((service) => (
                        <Col key={service.id} md={4} className="mb-4">
                            <Card className="top-service-card">
                                <Card.Body>
                                    <h5 className="card-title">{service.type}</h5>
                                    <p className="card-text"><strong>Valor:</strong> {service.price}</p>
                                    <p className="card-text">{service.summary}</p>
                                    {service.profileData.name && (
                                        <div>
                                            <p><strong>Nombre:</strong> {service.profileData.name} {service.profileData.lastName}</p>
                                            <p><strong>Región:</strong> {service.profileData.region}</p>
                                        </div>
                                    )}
                                    <Button variant="primary" onClick={() => handleServiceClick(service.type)}>Ver Detalle</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                
                <h1 className="text-center mb-4">Todos los Servicios</h1>
                {filteredServices.length > 0 ? (
                    <Row className="mt-5">
                        {filteredServices.map((service) => (
                            <Col key={service.id} md={4} className="mb-4">
                                <Card >
                                    <Card.Body>
                                        <h5 className="card-title">{service.type}</h5>
                                        <h5 className="card-title">{service.type}</h5>
                                        <p className="card-text"><strong>Valor:</strong> {service.price}</p>
                                        <p className="card-text">{service.summary}</p>
                                        {service.profileData.name && (
                                            <div>
                                                <p><strong>Nombre:</strong> {service.profileData.name} {service.profileData.lastName}</p>
                                                <p><strong>Región:</strong> {service.profileData.region}</p>
                                            </div>
                                        )}
                                        <Button variant='primary' onClick={() => handleServiceClick(service.type)}>Ver Detalle</Button>
                                        <Button variant='primary' onClick={() => handleServiceClick(service.type)}>Ver Detalle</Button>
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
