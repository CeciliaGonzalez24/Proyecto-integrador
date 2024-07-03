import React, { useEffect, useState } from 'react';
import { Service } from './Store'; // Importa el tipo Service
import { ProfileData } from './Profile'; // Importa el tipo ProfileData
import { ServiceCardReport } from '../home/report/ServiceCardReport'; // Importa el nuevo componente ServiceCardReport

export function ReportHome() {
    const [services, setServices] = useState<Service[]>([]);
    const savedProfile = localStorage.getItem('userProfile');
    const profileData: ProfileData = savedProfile ? JSON.parse(savedProfile) : {
        fullName: '',
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

    useEffect(() => {
        const savedServices = localStorage.getItem('services');
        if (savedServices) {
            const parsedServices: Service[] = JSON.parse(savedServices);
            const userServices = parsedServices.filter(service => service.email === profileData.email);
            setServices(userServices);
        }
    }, [profileData.email]);

    // Función para calcular las ventas totales generadas
    const calculateTotalSales = () => {
        return services.reduce((total, service) => total + parseInt(service.price), 0);
    };

    return (
        <div className="container mt-5">
            <h1>Reporte de Contrataciones</h1>
            {services.length > 0 ? (
                <div className="row mt-5">
                    {services.map(service => (
                        <ServiceCardReport
                            key={service.id}
                            service={service}
                            totalSales={calculateTotalSales()}
                        />
                    ))}
                </div>
            ) : (
                <p>No tienes contrataciones</p>
            )}
        </div>
    );
}