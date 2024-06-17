import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Service } from '../Store'; 

interface ServiceCardProps {
    service: Service;
    onEdit?: (service: Service) => void;
    onDelete?: (id: number) => void;
}

export function ServiceCard({ service, onEdit, onDelete }: ServiceCardProps) {
    return (
        <div className="col-md-4 mb-4">
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
                    {onEdit && onDelete && (
                        <div className="d-grid gap-2">
                            <Button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => onEdit(service)}
                            >
                                Editar
                            </Button>
                            <Button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => onDelete(service.id)}
                            >
                                Eliminar
                            </Button>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}
