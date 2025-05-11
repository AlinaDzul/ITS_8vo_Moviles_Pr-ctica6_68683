import { IonText } from '@ionic/react';
import { useContext } from 'react';
import { EPokedexMenuOption, MenuPokedexContext } from '../../contexts/MenuPokedexContext';
import './PokedexMenu.css';

const PokedexMenu: React.FC = () => {
    const { menuOption } = useContext(MenuPokedexContext);

    return (
        <div className="menu-container font-pokemon">
            <div className="crt-screen">
                <div className="menu-icon">🎮</div>
                <IonText>
                    <h2>¡Bienvenido, Entrenador!</h2>
                    <p className="menu-option active">
                        ▶ {EPokedexMenuOption[menuOption]}
                    </p>
                    <p className="menu-instruction">
                        Usa la <span className="highlight">cruceta</span> para navegar <br />
                        y el <span className="highlight">botón azul</span> para seleccionar.
                    </p>
                </IonText>
            </div>
        </div>
    );
};

export default PokedexMenu;

