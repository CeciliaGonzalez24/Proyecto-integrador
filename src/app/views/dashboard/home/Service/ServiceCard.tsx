import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Service } from '../Store';

interface ServiceCardProps {
    service: Service;
    onEdit: (service: Service) => void;
    onDelete: (id: number) => void;
    onRequest: (id: number) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onEdit, onDelete, onRequest }) => {
    return (
        <Card className="col m-4 mb-4">
            <Card.Body> {service.images.length > 0 && (
                        <img
                            src={service.images[0]} // Show the first image
                            alt="Service Image"
                            className="card-img-top"
                            style={{ maxHeight: '150px', objectFit: 'cover' }}
                        />
                    )}
                <Card.Title>{service.type}</Card.Title>
                <Card.Text>{service.summary}</Card.Text>
                <Card.Text><strong>Valor:</strong> {service.price}</Card.Text>
                <Card.Text><strong>Categoría:</strong> {service.category}</Card.Text>
                <Card.Text><strong>Disponibilidad:</strong> {Object.keys(service.availability).filter(day => service.availability[day]).join(', ')}</Card.Text>
                
                <Button variant="primary" onClick={() => onRequest(service.id)}>Solicitar Servicio</Button>
                <Button variant="warning" onClick={() => onEdit(service)}>Editar</Button>
                <Button variant="danger" onClick={() => onDelete(service.id)}>Eliminar</Button>
            </Card.Body>
        </Card>
    );
};
