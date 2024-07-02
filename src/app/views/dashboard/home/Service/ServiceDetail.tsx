import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Service } from '../Store'; // Asegúrate de importar correctamente tu tipo de servicio

const services: Service[] = JSON.parse(localStorage.getItem('services') || '[]');

interface Review {
    userName: string;
    content: string;
}

export function ServiceDetail() {
    const { serviceType } = useParams<{ serviceType: string }>();
    const service = services.find(s => s.type.toLowerCase() === serviceType.toLowerCase());

    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState<string>('');
    const [userName, setUserName] = useState<string>('');

    useEffect(() => {
        // Get the current user's name from localStorage
        const savedProfile = localStorage.getItem('userProfile');
        const profileData = savedProfile ? JSON.parse(savedProfile) : null;
        setUserName(profileData?.name || '');

        const savedReviews = localStorage.getItem('reviews');
        if (savedReviews) {
            const parsedReviews: Review[] = JSON.parse(savedReviews);
            setReviews(parsedReviews);
        }
    }, []);

    const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (newReview.trim() && userName.trim()) {
          const newReviews = [...reviews, { userName, content: newReview }];
          setReviews(newReviews);
          setNewReview('');
          // Save reviews to localStorage
          localStorage.setItem('reviews', JSON.stringify(newReviews));
      }
    };

    if (!service) {
        return <p className="text-center text-muted">Servicio no encontrado.</p>;
    }

    return (
        <div>
            <h1>{service.type}</h1>
            <p>{service.summary}</p>
            <p><strong>Valor:</strong> {service.price}</p>
            {service.profileData.name && (
                <div>
                    <p><strong>Nombre:</strong> {service.profileData.name} {service.profileData.lastName}</p>
                    <p><strong>Región:</strong> {service.profileData.region}</p>
                    <p><strong>Dirección:</strong> {service.profileData.address}</p>
                    <p><strong>Género:</strong> {service.profileData.gender}</p>
                </div>
            )}
            
            <div className="mt-4">
                {service.images.length > 0 ? (
                    <div className="image-gallery">
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

            <div className="reviews mt-4">
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
    );
}
