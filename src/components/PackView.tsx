import { IonText } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './Pack.css';

const PackView: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Obtener lista de objetos y sus detalles
    useEffect(() => {
        setIsLoading(true);
        fetch('https://pokeapi.co/api/v2/item?limit=50')
            .then(response => {
                if (!response.ok) throw new Error('Error al cargar los objetos');
                return response.json();
            })
            .then(data => {
                // Obtener detalles de cada objeto
                Promise.all(
                    data.results.map((item: any) => fetch(item.url).then(res => res.json()))
                )
                    .then(detailedItems => {
                        setItems(detailedItems);
                        setIsLoading(false);
                    })
                    .catch(err => {
                        setError('Error al cargar los detalles de los objetos');
                        setIsLoading(false);
                    });
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    
    (window as any).handleNavigation = () => {};
    (window as any).handleButtonClick = () => {};

    return (
        <div className="pack-view">
            {isLoading ? (
                <p>Cargando...</p>
            ) : error ? (
                <p>{error}</p>
            ) : items.length > 0 ? (
                <div className="item-list">
                    {items.map((item: any) => (
                        <div key={item.name} className="item-details">
                            <img
                                src={item.sprites.default}
                                alt={item.name}
                                className="item-image"
                                onError={(e) => (e.currentTarget.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png')}
                            />
                            <IonText>
                                <h2 className="item-name">{item.name.toUpperCase()}</h2>
                                <p className="item-description">
                                    {item.flavor_text_entries.find((entry: any) => entry.language.name === 'en')?.text?.replace(/\f/g, ' ') || 'No description available'}
                                </p>
                            </IonText>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay objetos disponibles</p>
            )}
        </div>
    );
};

export default PackView;