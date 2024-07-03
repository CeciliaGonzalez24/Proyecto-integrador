import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SERVICES_USER } from '../../../queries/getServicesByUser';
import { DELETE_SERVICE_MUTATION } from '../../../mutations/deleteService';

export function ReportHome() {
    const userId = localStorage.getItem('iduser') || '';
    const { loading, error, data, refetch } = useQuery(GET_SERVICES_USER, {
        variables: { id: userId },
    });

    const [deleteServiceById] = useMutation(DELETE_SERVICE_MUTATION);

    const handleDelete = async (serviceId: string) => {
        try {
            await deleteServiceById({
                variables: {
                    id: serviceId,
                },
            });
            console.log('Servicio eliminado con éxito');
            refetch(); 
        } catch (error) {
            console.error('Error al eliminar el servicio:', error);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Servicios Ofrecidos</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
                {data.getServicesByUser.map((service: any) => (
                    <Col key={service.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{service.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{service.description}</Card.Subtitle>
                                <Card.Text>Precio: {service.price}</Card.Text>
                                <Button variant="danger" onClick={() => handleDelete(service.id)}>Eliminar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}