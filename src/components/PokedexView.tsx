import { IonImg, IonText } from '@ionic/react';
import React, { useEffect, useState, useRef } from 'react';
import './PokedexView.css';

const PokedexView: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<any[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [description, setDescription] = useState<string>('');
    const listRef = useRef<HTMLDivElement>(null); 

    // Obtener lista de Pokémon
    useEffect(() => {
        setIsLoading(true);
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(response => response.json())
            .then(data => {
                setPokemonList(data.results);
                setIsLoading(false);
            })
            .catch(err => {
                setError('Error al cargar los Pokémon');
                setIsLoading(false);
            });
    }, []);

    // Obtener detalles del Pokémon seleccionado
    const fetchPokemonDetails = async (url: string) => {
        try {
            const pokemonResponse = await fetch(url);
            const pokemonData = await pokemonResponse.json();
            setSelectedPokemon(pokemonData);

            const speciesUrl = pokemonData.species.url;
            const speciesResponse = await fetch(speciesUrl);
            const speciesData = await speciesResponse.json();
            const descriptionEntry = speciesData.flavor_text_entries.find((entry: any) => entry.language.name === 'en')?.flavor_text || 'No description available';
            setDescription(descriptionEntry.replace(/\f/g, ' '));
        } catch (err) {
            setError('Error al cargar los detalles del Pokémon');
        }
    };

    // Desplazar automáticamente al elemento seleccionado
    useEffect(() => {
        if (listRef.current) {
            const selectedElement = listRef.current.children[currentIndex] as HTMLDivElement;
            if (selectedElement) {
                selectedElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }
        }
    }, [currentIndex]);

    // Navegar con cruceta y seleccionar con botón azul
    const handleNavigation = (direction: string, isButtonClick: boolean = false) => {
        if (selectedPokemon) {
           
            if (direction === 'up' || direction === 'down') {
                setSelectedPokemon(null);
                setDescription('');
            }
        } else {
            // Navegación en la lista
            if (direction === 'down' && currentIndex < pokemonList.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else if (direction === 'up' && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
            // Seleccionar con botón azul
            if (isButtonClick) {
                fetchPokemonDetails(pokemonList[currentIndex].url);
            }
        }
    };

    
    (window as any).handleNavigation = (direction: string) => handleNavigation(direction);
    (window as any).handleButtonClick = () => handleNavigation('', true); // Botón azul activa la selección

    return (
        <div className="pokedex-view">
            {isLoading ? (
                <p>Cargando...</p>
            ) : error ? (
                <p>{error}</p>
            ) : selectedPokemon ? (
                <div className="pokemon-details">
                    <IonImg
                        src={selectedPokemon.sprites.front_default}
                        className="pokemon-image"
                    />
                    <IonText>
                        <h2 className="pokemon-name">{selectedPokemon.name.toUpperCase()}</h2>
                        <p className="pokemon-description">{description}</p>
                    </IonText>
                    <IonText className="pokemon-id">N.º {selectedPokemon.id}</IonText>
                </div>
            ) : (
                <div className="pokemon-list" ref={listRef}>
                    {pokemonList.map((pokemon, index) => (
                        <div
                            key={pokemon.name}
                            className={`pokemon-item ${index === currentIndex ? 'selected' : ''}`}
                        >
                            <IonImg
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                                className="pokemon-list-image"
                            />
                            <IonText>{pokemon.name.toUpperCase()}</IonText>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PokedexView;