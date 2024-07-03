import React, { useState, useEffect } from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import { ProfileData } from './Profile';
import { ServiceCard } from './Service/ServiceCard';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_SERVICE_MUTATION } from '../../../mutations/createService';
import { GET_ALL_CATEGORIES_QUERY } from '../../../queries/getCategories';

export interface Service {
    id: number;
    type: string;
    price: string;
    summary: string;
    email: string;
    profileData: ProfileData;
    images: string[];
    requestCount: number;
    category: string;
    id2:string | null;
}

const initialService: Service = {
    id: 1,
    type: '',
    price: '',
    summary: '',
    email: '',
    profileData: {
        address: '',
        nationality: '',
        email: '',
        name: '',
        lastName: '',
    },
    images: [],
    requestCount: 0,
    category: '',
    id2:'',
};

const getNextServiceId = () => {
    const currentId = localStorage.getItem('serviceIdCounter');
    const nextId = currentId ? parseInt(currentId) + 1 : 1;
    localStorage.setItem('serviceIdCounter', nextId.toString());
    return nextId;
};

export function Store() {
    const [services, setServices] = useState<Service[]>([]);
    const [newService, setNewService] = useState<Service>(initialService);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const savedProfile = localStorage.getItem('userProfile');
    const profileData: ProfileData = savedProfile ? JSON.parse(savedProfile) : {
        address: '',
        nationality: '',
        email: '',
        name: '',
        lastName: '',
    };

    const { loading, error, data } = useQuery(GET_ALL_CATEGORIES_QUERY);
    const userId = localStorage.getItem('iduser') || '';
    console.log(userId)
    const [createServiceMutation] = useMutation(CREATE_SERVICE_MUTATION);
    console.log(newService.category,newService.price,newService.summary)

    useEffect(() => {
        const savedServices = localStorage.getItem('services');
        if (savedServices) {
            const parsedServices: Service[] = JSON.parse(savedServices);
            const userServices = parsedServices.filter(service => service.email === profileData.email);
            setServices(userServices);
        }
    }, [profileData.email]);

    useEffect(() => {
        const savedServices = localStorage.getItem('services');
        if (savedServices) {
            const parsedServices: Service[] = JSON.parse(savedServices);
            const updatedServices = parsedServices.filter(service => service.email !== profileData.email).concat(services);
            localStorage.setItem('services', JSON.stringify(updatedServices));
        } else {
            localStorage.setItem('services', JSON.stringify(services));
        }
    }, [services, profileData.email]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'price' && !(/^\d+$/.test(value))) {
            return;
        }
        setNewService({
            ...newService,
            [name]: value
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setImageFiles(Array.from(files));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newService.price && newService.category && newService.summary) {
            try {
                const { data } = await createServiceMutation({
                    variables: {
                        createService: {
                            name: newService.type,
                            price: Number(newService.price),
                            category_name: newService.category,
                            description: newService.summary,
                            id_user: userId
                        }
                    }
                });

                console.log('Servicio creado:', data);
                alert('Se ha registrado un nuevo servicio en el sistema.');

                const serviceWithProfile: Service = {
                    ...newService,
                    id: isEditing ? newService.id : getNextServiceId(),
                    email: profileData.email,
                    profileData: { ...profileData },
                    images: imageFiles.map(file => URL.createObjectURL(file)),
                    requestCount: newService.requestCount,
                    id2: data.createService.id
                };

                console.log('Nuevo servicio con perfil:', serviceWithProfile);

                if (isEditing) {
                    const updatedServices = services.map(service =>
                        service.id === newService.id ? serviceWithProfile : service
                    );
                    setServices(updatedServices);
                    setIsEditing(false);
                } else {
                    setServices([...services, serviceWithProfile]);
                }
                setNewService(initialService);
                setImageFiles([]);

            } catch (error) {
                console.error('Error al crear servicio:', error);
            }
        } else {
            alert('Por favor completa todos los campos.');
        }
    };

    const handleRequest = (id: number) => {
        const updatedServices = services.map(service =>
            service.id === id ? { ...service, requestCount: service.requestCount + 1 } : service
        );
        setServices(updatedServices);
    };

    const handleEdit = (service: Service) => {
        setNewService(service);
        setIsEditing(true);
        setImageFiles([]);
    };

    const handleDelete = (id: number) => {
        const updatedServices = services.filter(service => service.id !== id);
        setServices(updatedServices);
    };

    if (loading) return <p>Cargando categorías...</p>;
    if (error) return <p>Error al cargar categorías: {error.message}</p>;

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
                                    style={{ minWidth: '300px' }}
                                />
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
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label className="form-label"><strong>Categoría</strong></Form.Label>
                                <Form.Control
                                    as="select"
                                    className="form-control"
                                    name="category"
                                    value={newService.category}
                                    onChange={handleChange}
                                    style={{ minWidth: '300px' }}
                                >
                                    <option value="">Selecciona una categoría...</option>
                                    {data.getAllCategories.map((category: { id: number, name: string }) => (
                                        <option key={category.id} value={category.name}>{category.name}</option>
                                    ))}
                                </Form.Control>
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

                        <Form.Group className="mb-3">
                            <Form.Label className="form-label"><strong>Imágenes del Servicio</strong></Form.Label>
                            <Form.Control
                                className="form-control"
                                type="file"
                                multiple
                                onChange={handleImageChange}
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
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onRequest={handleRequest}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}