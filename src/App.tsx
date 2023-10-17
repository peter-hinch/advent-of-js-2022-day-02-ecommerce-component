import React, { useState } from 'react';
import './App.css';

import baconEggs from './assets/images/plate__bacon-eggs.png';
import chickenSalad from './assets/images/plate__chicken-salad.png';
import fishSticksFries from './assets/images/plate__fish-sticks-fries.png';
import frenchFries from './assets/images/plate__french-fries.png';
import ravioli from './assets/images/plate__ravioli.png';
import salmonVegetables from './assets/images/plate__salmon-vegetables.png';
import spaghettiMeatSauce from './assets/images/plate__spaghetti-meat-sauce.png';
import tortellini from './assets/images/plate__tortellini.png';

const menuItems = [
  {
    id: 1,
    description: 'Bacon and Eggs',
    image: baconEggs,
    price: 344
  },
  {
    id: 2,
    description: 'Chicken Salad',
    image: chickenSalad,
    price: 100
  },
  {
    id: 3,
    description: 'Fish Sticks with French Fries',
    image: fishSticksFries,
    price: 100
  },
  {
    id: 4,
    description: 'Hot Chips with Tomato Sauce',
    image: frenchFries,
    price: 223
  },
  {
    id: 5,
    description: 'Ravioli',
    image: ravioli,
    price: 100
  },
  {
    id: 6,
    description: 'Salmon and Vegetables',
    image: salmonVegetables,
    price: 512
  },
  {
    id: 7,
    description: 'Spaghetti with Sauce',
    image: spaghettiMeatSauce,
    price: 782
  },
  {
    od: 8,
    description: 'Tortellini',
    image: tortellini,
    price: 100
  }
];

// Currency format
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  return (
    <section className="container">
      <Menu menuItems={menuItems} cartItems={cartItems} />
      <Cart cartItems={cartItems} />
    </section>
  );
};

const Menu: React.FC<{ menuItems: object[]; cartItems: any[] }> = ({
  menuItems,
  cartItems
}) => {
  return (
    <div id="menu" className="panel panel__menu">
      <h2>To Go Menu</h2>
      <div className="panel__scroll-area">
        <ul id="menu__items">
          {menuItems.map((item: any) => {
            const isInCart: boolean = !!cartItems.find(
              (cartItem) => cartItem.id === item.id
            );
            return <MenuItem item={item} isInCart={isInCart} />;
          })}
        </ul>
      </div>
    </div>
  );
};

const MenuItem: React.FC<{ item: any; isInCart: boolean }> = ({
  item,
  isInCart
}) => {
  return (
    <li className="menu__item">
      <h3 className="item__description">{item.description}</h3>
      <img src={item.image} alt={item.description?.toLowerCase()} />
      <div className="price price__large">
        {formatter.format(item.price / 100)}
      </div>
      <button
        className={`item__add-remove${isInCart ? ' button__active' : ''}`}
      >
        <span className="button__content">
          {isInCart ? 'In Cart' : 'Add to Cart'}
        </span>
      </button>
    </li>
  );
};

const Cart: React.FC<{ cartItems: object[] }> = ({ cartItems }) => {
  return (
    <div id="cart" className="panel panel__cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 && <p>Your cart is empty</p>}
      <div className="panel__scroll-area">
        <ul id="cart__items">
          <li className="cart__item">
            <h3 className="item__description">Hot Chips with Tomato Sauce</h3>
            <div className="item__image-container">
              <img
                src="./assets/images/plate__french-fries.png"
                alt="hot chips with tomato sauce"
              />
              <div className="image__count-badge">2</div>
            </div>
            <div className="price">$2.23</div>
            <div className="item__line">
              <div className="line__options">
                <button className="options__decrement"></button>
                <span className="options__qty">2</span>
                <button className="options__increment"></button>
              </div>
              <span className="price price__large">$4.46</span>
            </div>
          </li>
          <li className="cart__item">
            <h3 className="item__description">Spaghetti with Sauce</h3>
            <div className="item__image-container">
              <img
                src="./assets/images/plate__spaghetti-meat-sauce.png"
                alt="spaghetti with sauce"
              />
              <div className="image__count-badge">2</div>
            </div>
            <div className="price">$7.82</div>
            <div className="item__line">
              <div className="line__options">
                <button className="options__decrement"></button>
                <span className="options__qty">2</span>
                <button className="options__increment"></button>
              </div>
              <span className="price price__large">$15.64</span>
            </div>
          </li>
        </ul>
        <hr />
        <div className="cart__totals">
          <div className="totals__label">Subtotal:</div>
          <div className="price price__large">$20.10</div>
          <div className="totals__label">Tax:</div>
          <div className="price price__large">$1.96</div>
          <div className="totals__label">Total:</div>
          <div className="price price__large price__total">$30.12</div>
        </div>
      </div>
    </div>
  );
};

const CartItem: React.FC<{ item: object }> = ({ item }) => {
  return (
    <li className="cart__item">
      <h3 className="item__description">Hot Chips with Tomato Sauce</h3>
      <div className="item__image-container">
        <img
          src="./assets/images/plate__french-fries.png"
          alt="hot chips with tomato sauce"
        />
        <div className="image__count-badge">2</div>
      </div>
      <div className="price">$2.23</div>
      <div className="item__line">
        <div className="line__options">
          <button className="options__decrement"></button>
          <span className="options__qty">2</span>
          <button className="options__increment"></button>
        </div>
        <span className="price price__large">$4.46</span>
      </div>
    </li>
  );
};

export default App;
