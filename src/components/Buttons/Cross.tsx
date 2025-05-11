import { useContext } from "react";
import { EPokedexScreen, MenuPokedexContext } from "../../contexts/MenuPokedexContext";

interface CrossProps {
    onNavigate?: (direction: string) => void; // Definir la prop onNavigate como opcional
}

export const Cross: React.FC<CrossProps> = ({ onNavigate }) => {
    const { screen, menuOption, setMenuOption } = useContext(MenuPokedexContext);

    const handleClick = (direction: string) => {
        if (screen === EPokedexScreen.MENU) {
            // Navegación en el menú principal
            if (direction === 'up') {
                const newOption = menuOption - 1 < 1 ? 3 : menuOption - 1;
                setMenuOption(newOption);
            } else if (direction === 'down') {
                const newOption = menuOption + 1 > 3 ? 1 : menuOption + 1;
                setMenuOption(newOption);
            }
        } else if (screen === EPokedexScreen.POKEDEX && onNavigate) {
            // Navegación en la pantalla de Pokédex
            onNavigate(direction);
        }
    };

    return (
        <div id="cross">
            <div id="leftcross" className="gameboy-button" onClick={() => handleClick('left')}>
                <div id="leftT"></div>
            </div>
            <div id="topcross" className="gameboy-button" onClick={() => handleClick('up')}>
                <div id="upT"></div>
            </div>
            <div id="rightcross" className="gameboy-button" onClick={() => handleClick('right')}>
                <div id="rightT"></div>
            </div>
            <div id="midcross" className="gameboy-button">
                <div id="midCircle"></div>
            </div>
            <div id="botcross" className="gameboy-button" onClick={() => handleClick('down')}>
                <div id="downT"></div>
            </div>
        </div>
    );
};