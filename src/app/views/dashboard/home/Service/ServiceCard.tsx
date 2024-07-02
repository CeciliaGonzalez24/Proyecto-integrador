import React from 'react';
import { Service } from '../Store';
import { Button } from 'react-bootstrap';

interface ServiceCardProps {
    service: Service;
    onEdit: (service: Service) => void;
    onDelete: (id: number) => void;
    onRequest: (id: number) => void;  // Nueva propiedad para manejar solicitudes

}

export function ServiceCard({ service, onEdit, onDelete, onRequest }: ServiceCardProps) {
    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                <div className="card-body">
                    {service.images.length > 0 && (
                        <img
                            src={service.images[0]} // Show the first image
                            alt="Service Image"
                            className="card-img-top"
                            style={{ maxHeight: '150px', objectFit: 'cover' }}
                        />
                    )}
                    <h5 className="card-title">{service.type}</h5>
                    <p className="card-text"><strong>Valor:</strong> {service.price}</p>
                    <p className="card-text">{service.summary}</p>
                    {service.profileData.name && (
                        <div>
                            <p><strong>Nombre:</strong> {service.profileData.name} {service.profileData.lastName}</p>
                            <p><strong>Región:</strong> {service.profileData.region}</p>
                            <p><strong>Nacionalidad:</strong> {service.profileData.nationality}</p>
                            <p><strong>Género:</strong> {service.profileData.gender}</p>
                        </div>
                    )}
                    <p className="card-text">Solicitudes: {service.requestCount}</p>  {/* Mostrar el conteo de solicitudes */}
                    <button className="btn btn-primary" onClick={() => onRequest(service.id)}>Solicitar</button>  {/* Botón para solicitar el servicio */}
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
                </div>
            </div>
        </div>
    );
}
