import React, {useEffect, useState} from "react";
import {useLocalStorageState} from "./useLocalStorageState";
import Modal from "./Modal";
import countImage from '../assets/count.png';
import HamsterEnergy from "./HamsterEnergy";
import form from "./form.css";
import {CasinoContent, FriendsContent, MainContent, ShopContent} from "./Tabs";

const Hamster = () => {
    const [count, setCount] = useLocalStorageState("count", 0 || 0);
    const [level, setLevel] = useLocalStorageState("level", 1 || 1);
    const [shouldLevelUp, setShouldLevelUp] = useState(false);
    const [bet, setBet] = useState("");
    const [result, setResult] = useState(null);
    const [isCheatModalOpen, setIsCheatModalOpen] = useState(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
    const [isRefusalModalOpen, setIsRefusalModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('main');
    const [inputCount, setInputCount] = useState('');
    const [inputLevel, setInputLevel] = useState('');
    const [inputEnergy, setInputEnergy] = useState('');

    const renderContent = () => {
        switch (activeTab) {
            case 'main':
                return <MainContent
                    count={count}
                    addCount={addCount}
                    isEnabled={isEnabled}
                    handleEnergyChange={handleEnergyChange}
                    warningModalOpen={warningModalOpen}
                    setIsFAQModalOpen={setIsFAQModalOpen}
                    cheatMenu={cheatMenu}
                />;
            case 'shop':
                return <ShopContent
                    count={count}
                />;
            case 'casino':
                return <CasinoContent
                    bet={bet}
                    count={count}
                    setCount={setCount}
                    setResult={setResult}
                    handleBetChange={handleBetChange}
                    result={result}
                />;
            case 'friend':
                return <FriendsContent/>;
            default:
                return <MainContent
                    count={count}
                    addCount={addCount}
                    isEnabled={isEnabled}
                    handleEnergyChange={handleEnergyChange}
                />;
        }
    }

    const {
        energy,
        isEnabled,
        startRestoringEnergy,
        stopRestoringEnergy,
        handleEnergyChange,
        toggleEnabled,
        setEnergy,
    } = HamsterEnergy();

    useEffect(() => {
        if (shouldLevelUp) {
            const upgradeCost = level * (200 * level);
            if (count >= upgradeCost) {
                setCount(count - upgradeCost);
                setLevel(level + 1);
                setIsRefusalModalOpen(false);
            } else {
                setIsRefusalModalOpen(true);
            }
            setShouldLevelUp(false);
        }
    }, [shouldLevelUp, count, level, setCount, setLevel, setIsRefusalModalOpen]);

    const closeModal = () => {
        setIsCheatModalOpen(false);
        setIsWarningModalOpen(false);
        setIsClearModalOpen(false);
        setIsFAQModalOpen(false);
        setIsRefusalModalOpen(false);
    };

    const clearLocalStorage = () => {
        localStorage.clear();
        setCount(0);
        setLevel(1);
        setEnergy(1000);
        setIsClearModalOpen(true)
        setIsWarningModalOpen(false)
    };

    const warningModalOpen = () => {
        setIsWarningModalOpen(true)
    };

    const noWarningModalOpen = () => {
        setIsWarningModalOpen(false)
    };

    const handleBetChange = (e) => {
        setBet(e.target.value);
    };

    const handleLevelUp = () => {
        if (count >= level * (200 * level)) {
            setShouldLevelUp(true);
        } else {
            setIsRefusalModalOpen(true);
        }
    };

    const addCount = () => {
        setCount(count + level);
    };

    const totalCount = level;

    const cheatMenu = () => {
        setIsCheatModalOpen(true);
    };

    const addCountInput = (e) => setInputCount(e.target.value);
    const addLevelInput = (e) => setInputLevel(e.target.value);
    const addEnergyInput = (e) => setInputEnergy(e.target.value);

    const cheatButton = (e) => {
        e.preventDefault();
        const newCheatCount = inputCount.trim() !== '' ? Math.max(0, parseInt(inputCount, 10)) : count;
        const newCheatLevel = inputLevel.trim() !== '' ? Math.max(1, parseInt(inputLevel, 10)) : level;
        const newCheatEnergy = inputEnergy.trim() !== '' ? Math.min(1000, Math.max(0, parseInt(inputEnergy, 10))) : energy;
        setCount(newCheatCount);
        setLevel(newCheatLevel);
        setEnergy(newCheatEnergy);
        setIsCheatModalOpen(false);
        setInputCount('');
        setInputLevel('');
        setInputEnergy('');
    }

    return (
        <div className="main">
            <div className="header">
                <h1>Hamster</h1>
            </div>
            <div className="topMenu">
                <h3 className="menuItems">📆 Ежедневная награда</h3>
                <h3 className="menuItems"> 🔝 {level} уровень</h3>
                <h3 className="menuItems"><img style={{width: '20px'}} src={countImage} alt="$"/> + {totalCount} за клик
                </h3>
                <h3 className="menuItems">⚡️ {energy}</h3>
            </div>
            <main>
                {renderContent()}
            </main>
            <br/>
            <div className="footer-container">
                <div className="footer">
                    <button
                        className={activeTab === "main" ? 'activeButton' : 'buttonMain'}
                        onClick={() => {
                            setActiveTab('main');
                        }}
                    >
                        <span className='icon'>⛏️</span>
                        <span className='text'>Майнить</span>
                    </button>
                    <button
                        className={activeTab === "shop" ? 'activeButton' : 'buttonMain'}
                        onClick={() => {
                            setActiveTab('shop');
                        }}
                    >
                        <span className='icon'>🛒</span>
                        <span className='text'>Магазин</span>
                    </button>
                    <button
                        className={activeTab === "casino" ? 'activeButton' : 'buttonMain'}
                        onClick={() => {
                            setActiveTab('casino');
                        }}
                    >
                        <span className='icon'>🎲</span>
                        <span className='text'>Казино</span>
                    </button>
                    <button
                        className={activeTab === "friend" ? 'activeButton' : 'buttonMain'}
                        onClick={() => {
                            setActiveTab('friend');
                        }}
                    >
                        <span className='icon'>👥</span>
                        <span className='text'>Друзья</span>
                    </button>
                    <button
                        className="buttonMain"
                        onClick={handleLevelUp}
                    >
                        <span className='icon'>🚀</span>
                        <span className='text'>Поднять уровень ({level * (200 * level)} 💲)</span>
                    </button>
                </div>
            </div>

            <Modal
                isOpen={isRefusalModalOpen}
                onClose={() => setIsRefusalModalOpen(false)}
                title="Недостаточно средств"
            >
                <p>Вам нужно намайнить больше денег</p>
            </Modal>

            <Modal
                isOpen={isCheatModalOpen}
                onClose={() => setIsCheatModalOpen(false)}
            >
                <form className="formDev">
                    <fieldset>
                        <legend>Меню разработчика</legend>
                        <div>
                            <label htmlFor="count">Деньги: </label>
                            <input onChange={addCountInput} className="formInput" type="number" id="count"
                                   name="count"/>
                        </div>
                        <div>
                            <label htmlFor="level">Уровень: </label>
                            <input onChange={addLevelInput} className="formInput" type="number" id="level"
                                   name="level"/>
                        </div>
                        <div>
                            <label htmlFor="energy">Энергия: </label>
                            <input onChange={addEnergyInput} className="formInput" type="number" id="energy"
                                   name="energy"/>
                        </div>
                        <button type="button" className="formButton" onClick={cheatButton}>Подтвердить</button>
                    </fieldset>
                </form>
            </Modal>

            <Modal
                isOpen={isFAQModalOpen}
                onClose={() => setIsFAQModalOpen(false)}
                title="F.A.Q."
            >
                <p>
                    Скоро мы выпустим крипту и ты будешь сказочно богат, можешь уже
                    увольняться с работы
                </p>
            </Modal>

            <Modal
                isOpen={isClearModalOpen}
                onClose={() => setIsClearModalOpen(false)}
                title="Ваши достижения были сброшены!"
            ></Modal>

            <Modal
                isOpen={isWarningModalOpen}
                onClose={() => setIsWarningModalOpen(false)}
                title="Вы уверены, что хотите начать новую игру?"
            >
                <p>Все Ваши данные, включая ваши достижения, покупки, игровой прогресс будут безвозвратно удалены.</p>
                <div className="containerDelete">
                    <button className="buttonDelete no" onClick={noWarningModalOpen}>Назад</button>
                    <button className="buttonDelete yes" onClick={clearLocalStorage}>Начать новую игру</button>
                </div>
            </Modal>
        </div>
    );
};

export default Hamster;

