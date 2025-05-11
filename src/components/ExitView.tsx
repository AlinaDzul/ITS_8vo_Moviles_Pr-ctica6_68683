import React from 'react';
import { IonButton, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { App } from '@capacitor/app';
import { EPokedexMenuOption, EPokedexScreen, MenuPokedexContext } from '../contexts/MenuPokedexContext';
import './ExitView.css';

const ExitView: React.FC = () => {
    const history = useHistory();
    const { setScreen, setMenuOption } = React.useContext(MenuPokedexContext);

    const handleExit = async () => {
        try {
            await App.exitApp();
        } catch (error) {
            console.error('Error al intentar cerrar la aplicación:', error);
            setScreen(EPokedexScreen.MENU);
            setMenuOption(EPokedexMenuOption.POKEDEX);
            history.push('/home');
        }
    };

    const handleReturn = () => {
        setScreen(EPokedexScreen.MENU);
        setMenuOption(EPokedexMenuOption.POKEDEX);
        history.push('/home');
    };

    return (
        <div className="exit-view pokedex-view">
            <div className="exit-box">
                <IonText>
                    <h1>¿Salir?</h1>
                    <p>¿Estás seguro de cerrar la Pokédex?</p>
                </IonText>
                <IonButton expand="block" color="danger" size="small" onClick={handleExit}>
                    Sí, salir
                </IonButton>
                <IonButton expand="block" color="medium" size="small" onClick={handleReturn}>
                    No, regresar
                </IonButton>
            </div>
        </div>
    );
};

export default ExitView;
