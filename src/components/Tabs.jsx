import countImage from "../assets/count.png";
import React from "react";
import hamsterImage from "../assets/hamster.jpg";
import PlaceBet from "./PlaceBet";
import form from "./style.css";
import Shop from "./Shop";
import "./tabs.css";

export const MainContent = ({
                                count,
                                addCount,
                                handleEnergyChange,
                                isEnabled,
                                warningModalOpen,
                                cheatButton,
                                setIsFAQModalOpen,
                                cheatMenu
                            }) => {
    return (
        <div>
            <div className='headCount'>
                <img src={countImage} alt="$"/>
                <span className="countBold">{count.toLocaleString('ru-RU')}</span>
            </div>
            <img
                style={{pointerEvents: isEnabled ? 'auto' : 'none'}}
                className="Clicker"
                src={hamsterImage}
                onClick={() => {
                    addCount();
                    handleEnergyChange();
                }}
                alt="hamster image"
            />
            <p
                className="blinking-text"
                style={{cursor: "pointer"}}
                onClick={() => setIsFAQModalOpen(true)}
            >
                FAQ
            </p>
            <br/>
            <p
                style={{cursor: "pointer", color: "white"}}
                onClick={warningModalOpen}
            >
                Начать новую игру
            </p>
            <p
                style={{cursor: "pointer", color: "white"}}
                onClick={cheatMenu}
            >
                Меню разработчика
            </p>
        </div>
    );
};
export const ShopContent = ({count}) => (
    <div>
        <div className="headCount">
            <img src={countImage} alt="$"/>
            {count.toLocaleString('ru-RU')}
        </div>
        <div className='shopTabsContainer'>
            <Shop/>
        </div>
    </div>
);
export const CasinoContent = ({bet, count, setCount, setResult, handleBetChange, result}) => (
    <div>
        <div className="headCount">
            <img src={countImage} alt="$"/>
            {count.toLocaleString('ru-RU')}
        </div>
        <PlaceBet
            bet={bet}
            count={count}
            setCount={setCount}
            setResult={setResult}
            handleBetChange={handleBetChange}
            result={result}
        />
    </div>
);
export const FriendsContent = () => (
    <div>
        <div className="friendsHeader">
            <h1>Приглашайте друзей! Зарабатывайте вметсе!</h1>
            <h2>Вы и ваши друзья получите приятные бонусы</h2>
            <h3>За каждого друга +10% от его дохода, а также 1.5% за друзей, приведеных им!</h3>
        </div>
    </div>
);