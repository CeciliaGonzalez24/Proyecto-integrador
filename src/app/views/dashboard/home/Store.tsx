import React, { useState } from 'react';
import { Col, Row, Form, Button, Card } from 'react-bootstrap';

interface Service {
    id: number;
    type: string;
    price: string;
    availability: string;
    summary: string;
}

const initialService: Service = {
    id: 1,
    type: '',
    price: '',
    availability: '',
    summary: ''
    
};

export function Store() {
    const [services, setServices] = useState<Service[]>([]);
    const [newService, setNewService] = useState<Service>(initialService);
    const [isEditing, setIsEditing] = useState<boolean>(false); // Estado para manejar la edición de servicios

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // Validación para el campo de precio (aceptar solo números)
        if (name === 'price' && !(/^\d+$/.test(value))) {
            return; // No actualiza el estado si no es un número
        }
        setNewService({
            ...newService,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newService.type && newService.price && newService.availability && newService.summary) {
            if (isEditing) {
                // Actualizar el servicio existente si está en modo de edición
                const updatedServices = services.map(service =>
                    service.id === newService.id ? { ...newService } : service
                );
                setServices(updatedServices);
                setIsEditing(false);
            } else {
                // Agregar nuevo servicio
                setServices([...services, { ...newService, id: services.length + 1 }]);
            }
            setNewService(initialService);
        } else {
            alert('Por favor completa todos los campos.');
        }
    };

    const handleEdit = (service: Service) => {
        setNewService(service);
        setIsEditing(true);
    };

    const handleDelete = (id: number) => {
        const updatedServices = services.filter(service => service.id !== id);
        setServices(updatedServices);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="text-center mb-4">Servicios</h1>
                    <p className="text-center mb-4 text-muted">
                        ¿Tienes un servicio que ofrecer? ¡No pierdas el tiempo, te están buscando!
                    </p>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            
                                <Form.Group>
                                    <Form.Label className="form-label"><strong>Tipo de Servicio</strong></Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        name="type"
                                        value={newService.type}
                                        onChange={handleChange}
                                        placeholder="Ej. Peluquería, Electricista, etc."
                                        style={{ minWidth: '300px' }} // Ajuste de ancho mínimo
                                    />
                                </Form.Group>
                            
                            <Row md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="form-label"><strong>Valor</strong></Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        name="price"
                                        value={newService.price}
                                        onChange={handleChange}
                                        placeholder="Ej. $50.000 CLP por hora"
                                        style={{ minWidth: '300px' }} // Ajuste de ancho mínimo
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label className="form-label"><strong>Disponibilidad</strong></Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        name="availability"
                                        value={newService.availability}
                                        onChange={handleChange}
                                        placeholder="Ej. Lunes a Viernes, 9am - 5pm"
                                        style={{ minWidth: '300px' }} // Ajuste de ancho mínimo
                                    />
                                </Form.Group>
                            </Row>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label className="form-label"><strong>Resumen del Servicio</strong></Form.Label>
                            <Form.Control
                                className="form-control"
                                as="textarea"
                                rows={3}
                                name="summary"
                                value={newService.summary}
                                onChange={handleChange}
                                placeholder="Descripción breve del servicio que ofreces..."
                                style={{ minWidth: '600px' }} // Ajuste de ancho mínimo
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            {!isEditing ? (
                                <Button type="submit" className="btn btn-primary">
                                    Agregar Servicio
                                </Button>
                            ) : (
                                <Button type="submit" className="btn btn-primary">
                                    Guardar Cambios
                                </Button>
                            )}
                        </div>
                    </Form>
                </div>
            </div>

            {services.length > 0 && (
                <div className="row mt-5">
                    {services.map((service) => (
                        <div key={service.id} className="col-md-4 mb-4">
                            <Card>
                                <Card.Body>
                                    <h5 className="card-title">{service.type}</h5>
                                    <p className="card-text"><strong>Valor:</strong> {service.price}</p>
                                    <p className="card-text"><strong>Disponibilidad:</strong> {service.availability}</p>
                                    <p className="card-text">{service.summary}</p>
                                    <div className="d-grid gap-2">
                                        <Button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => handleEdit(service)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(service.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
