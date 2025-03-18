import React from "react";

const PlaceBet = ({bet, count, setCount, setResult, handleBetChange, result}) => {
    const placeBet = () => {
        const betValue = Number(bet);
        if (betValue > count) {
            setResult("Недостаточно денег для ставки");
        } else {
            const win = Math.random() > 0.52;
            if (win) {
                setCount(count + betValue);
                setResult("Ты выиграл(а)!");
            } else {
                setCount(count - betValue);
                setResult("Ты проиграл(а)!");
            }
        }
    };
    return (
        <div>
            <p>Какую сумму мы готовы поставить?</p>
            <div style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                margin: "10px"
            }}>
                    <input style={{width: '100vh'}}
                        className="inputBet"
                        type="tel"
                        value={bet}
                        onChange={handleBetChange}
                    />
            </div>
                    <button className="buttonBet" onClick={placeBet}>
                        Сделать ставку
                    </button>
                {result && <p>{result}</p>}

        </div>
    )
};

export default PlaceBet;