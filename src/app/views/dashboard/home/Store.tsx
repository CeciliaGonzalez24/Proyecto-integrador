import React, { useState, useEffect } from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { ProfileData } from './Profile';
import { CREATE_SERVICE_MUTATION } from '../../../mutations/createService';
import { GET_ALL_CATEGORIES_QUERY } from '../../../queries/getCategories';
import { GET_SERVICES_USER } from '../../../queries/getServicesByUser';

type CreateServiceDto = {
  category_name: string;
  description: string;
  id_user: string;
  name: string;
  price: number;
};

export interface Service {
  id: string;
  type: string;
  price: string;
  availability: string;
  summary: string;
  email: string;
  profileData: ProfileData;
}

const initialService: Service = {
  id: '',
  type: '',
  price: '',
  availability: '',
  summary: '',
  email: '',
  profileData: {
    fullName: '',
    id: '',
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
  }
};

export function Store() {
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState<Service>(initialService);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<string>('');

  const userId = localStorage.getItem('iduser') || '';
  const savedProfile = localStorage.getItem('userProfile');
  const profileData: ProfileData = savedProfile ? JSON.parse(savedProfile) : {
    fullName: '',
    id:'',
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
  };

  const { loading, error, data } = useQuery(GET_ALL_CATEGORIES_QUERY);

  const { loading: servicesLoading, error: servicesError, data: userServicesData } = useQuery(GET_SERVICES_USER, {
    variables: { id: userId },
    onCompleted: (data) => {
      setServices(data.getServicesByUser);
    },
    onError: (error) => {
      console.error('Error al obtener servicios del usuario:', error);
    }
  });

  useEffect(() => {
    if (servicesError) {
      console.error('Error al obtener servicios del usuario:', servicesError);
    }
  }, [servicesError]);

  const [createServiceMutation] = useMutation(CREATE_SERVICE_MUTATION, {
    onCompleted: (data) => {
      console.log('Servicio creado:', data.createService);
      setServices([...services, data.createService]);
      setNewService(initialService);
    },
    onError: (error) => {
      console.error('Error crear el servicio:', error);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewService({
      ...newService,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId || !profileData.email) {
      console.error('No se puede enviar el formulario: userId o email no definido.');
      return;
    }

    if (newService.type.trim() !== '' && newService.price.trim() !== '' && newService.summary.trim() !== '') {
      const variables: { createService: CreateServiceDto } = {
        createService: {
          category_name: newService.type,
          description: newService.summary,
          id_user: userId,
          name: 'NOMBRE SERVICIO', 
          price: parseFloat(newService.price)
        }
      };
      console.log('Datos enviados al servidor:', variables);
      createServiceMutation({
        variables
      });
    } else {
      alert('Por favor completa todos los campos.');
    }
  };

  const handleEdit = (service: Service) => {
    setNewService(service);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
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
                  as="select"
                  name="type"
                  value={newService.type}
                  onChange={handleChange}
                  style={{ minWidth: '300px' }}
                >
                  <option value="">Selecciona una categoría</option>
                  {data && data.getAllCategories && data.getAllCategories.map((category: { id: string, name: string }) => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label className="form-label"><strong>Valor</strong></Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  name="price"
                  value={newService.price}
                  onChange={handleChange}
                  placeholder="Ej. $50.000 CLP por hora"
                  style={{ minWidth: '300px' }}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label className="form-label"><strong>Descripción del Servicio</strong></Form.Label>
              <Form.Control
                className="form-control"
                as="textarea"
                rows={3}
                name="summary"
                value={newService.summary}
                onChange={handleChange}
                placeholder="Descripción del servicio que ofreces..."
                style={{ minWidth: '600px' }}
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
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{service.type}</h5>
                  <p className="card-text">{service.summary}</p>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleEdit(service)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(service.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}