import React from "react";
import form from "./shop.css";

const Shop = ({count, setCount}) => {



    return(
        <div className="shop-container">
            <div className="card">
                <h2>Название Перка</h2>
                <p>Картинка для перка</p>
                <p>Уровень Перка</p>
                <p>Цена Перка</p>
                <button>Купить</button>
            </div>
        </div>
    )
}


export default Shop;