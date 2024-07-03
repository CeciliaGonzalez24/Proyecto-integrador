import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Service } from '../Store'; // Asegúrate de importar correctamente tu tipo de servicio
import './ServiceDetail.css'; // Asegúrate de importar tu archivo CSS

interface Review {
    userName: string;
    content: string;
}

interface Props {
    service: Service;
    userName: string;
}

export function ServiceDetail() {
    const { type } = useParams<{ type: string }>(); // Obtener el parámetro type de la URL
    const history = useHistory(); // Hook para redirigir
    const services: Service[] = JSON.parse(localStorage.getItem('services') || '[]');
    const service = services.find(s => s.type.toLowerCase() === type.toLowerCase()); // Buscar el servicio por type

    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState<string>('');
    const [userName, setUserName] = useState<string>('');

    const [chatOpen, setChatOpen] = useState(false); // Estado para controlar la ventana de chat
    const [chatMessages, setChatMessages] = useState<string[]>([]); // Estado para mensajes del chat

    useEffect(() => {
        // Obtener el nombre del usuario actual de localStorage
        const savedProfile = localStorage.getItem('userProfile');
        const profileData = savedProfile ? JSON.parse(savedProfile) : null;
        setUserName(profileData?.name || '');

        const savedReviews = localStorage.getItem('reviews');
        if (savedReviews) {
            const parsedReviews: Review[] = JSON.parse(savedReviews);
            setReviews(parsedReviews);
        }

        const savedChatResponses = localStorage.getItem('chatResponses');
        if (savedChatResponses) {
            const parsedResponses: string[] = JSON.parse(savedChatResponses);
            setChatMessages(parsedResponses);
        }
    }, []);

    const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newReview.trim() && userName.trim() && service) { // Verificar que service no sea undefined
            const newReviews = [...reviews, { userName, content: newReview }];
            setReviews(newReviews);
            setNewReview('');
            // Guardar las reseñas en localStorage
            localStorage.setItem('reviews', JSON.stringify(newReviews));
        }
    };

    const handleHireClick = () => {
        if (service) {
            // Redirigir a la página de reservas solo si service no es undefined
            history.push(`/reservation?serviceType=${service.type}&userName=${userName}`); // Asegúrate de que la ruta sea correcta
        }
    };

    const handleChatClick = () => {
        // Lógica para abrir o cerrar la ventana de chat
        setChatOpen(prevState => !prevState); // Alternar el estado de chatOpen
    };

    const handleChatSubmit = (question: string) => {
        const trimmedQuestion = question.trim().toLowerCase();
        const response = chatMessages.find(msg => msg.toLowerCase().includes(trimmedQuestion));
        if (response) {
            return response;
        } else {
            return "Espere mientras nos contactamos contigo...";
        }
    };

    if (!service) {
        return <p className="text-center text-muted">Servicio no encontrado.</p>;
    }

    return (
        <div className="service-detail-container">
            <div className="service-info">
                <h1>{service.type}</h1>
                <p>{service.summary}</p>
                <p><strong>Valor:</strong> {service.price}</p>
                {service.profileData.name && (
                    <div>
                        <p><strong>Nombre:</strong> {service.profileData.name} {service.profileData.lastName}</p>
                        <p><strong>Dirección:</strong> {service.profileData.address}</p>
                    </div>
                )}
                
                <div className="reviews mt-4">
                    <button 
                        className="btn btn-success mb-4" 
                        onClick={handleHireClick}
                    >
                        Contratar
                    </button>

                    <button 
                        className="btn btn-primary mb-4" 
                        onClick={handleChatClick}
                    >
                        Chat
                    </button>

                    {chatOpen && (
                        <div className="chat-window">
                            {/* Contenido del chat */}
                            <p>Bienvenido al chat. ¿En qué puedo ayudarte hoy?</p>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const userInput = (e.target as HTMLFormElement).elements.namedItem('userInput') as HTMLInputElement;
                                if (userInput) {
                                    const response = handleChatSubmit(userInput.value);
                                    alert(response); // Aquí podrías mostrar la respuesta en algún componente adecuado
                                    userInput.value = ''; // Limpiar el input después de enviar
                                }
                            }}>
                                <input
                                    type="text"
                                    name="userInput"
                                    className="form-control mb-2"
                                    placeholder="Escribe tu pregunta aquí..."
                                />
                                <button type="submit" className="btn btn-primary mb-2">Enviar</button>
                            </form>
                        </div>
                    )}

                    <h2>Reseñas</h2>
                    <form onSubmit={handleReviewSubmit}>
                        <div className="form-group">
                            <label htmlFor="userName">Nombre:</label>
                            <input
                                id="userName"
                                className="form-control"
                                value={userName}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newReview">Agregar una reseña:</label>
                            <textarea
                                id="newReview"
                                className="form-control"
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </form>
                    
                    <div className="review-list mt-4">
                        {reviews.length === 0 ? (
                            <p className="text-muted">Aún no hay reseñas.</p>
                        ) : (
                            reviews.map((review, index) => (
                                <div key={index} className="review">
                                    <p><strong>{review.userName}:</strong> {review.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="image-gallery">
                {service.images.length > 0 ? (
                    <div>
                        {service.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Service Image ${index + 1}`}
                                className="img-fluid mb-2"
                                style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover' }}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-muted">No hay imágenes disponibles para este servicio.</p>
                )}
            </div>
        </div>
    );
}

export default ServiceDetail;
