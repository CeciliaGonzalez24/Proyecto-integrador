import React from 'react';
import { Card, Row, Col } from 'react-bootstrap'; // Asegúrate de importar Row y Col para el sistema de grillas
import { Service } from '../Store'; // Ajusta la ruta según sea necesario
import './ServiceCardReport.css'; // Importa el archivo CSS

interface ServiceCardReportProps {
    service: Service;
    totalSales?: number; // Nuevo prop para las ventas totales generadas
}

export const ServiceCardReport: React.FC<ServiceCardReportProps> = ({ service, totalSales }) => {
    return (
        <Card className="mb-3 service-card-report">
            <Card.Body>
                <Row>
                    <Col md={6}> {/* Columna para la información del servicio */}
                        <Card.Title>{service.type}</Card.Title>
                        <Card.Text>
                            <strong>Valor:</strong> {service.price}
                        </Card.Text>
                        <Card.Text>
                            <strong>Descripción:</strong> {service.summary}
                        </Card.Text>
                        <Card.Text>
                            <strong>Email:</strong> {service.email}
                        </Card.Text>
                        <div>
                            {service.images.map((image, index) => (
                                <img key={index} src={image} alt={`Service Image ${index}`} className="service-image" />
                            ))}
                        </div>
                    </Col>
                    <Col md={6}> {/* Columna para las ventas generadas */}
                        <Card.Text className="sales-info">
                            Estamos trabajando en tu reportería, espera tu proxima actualizacion
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};