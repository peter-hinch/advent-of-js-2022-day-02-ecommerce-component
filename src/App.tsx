import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <section className="container">
      <div id="menu" className="panel panel__menu">
        <h2>To Go Menu</h2>
        <div className="panel__scroll-area">
          <ul id="menu__items">
            <li className="menu__item">
              <h3 className="item__description">Hot Chips with Tomato Sauce</h3>
              <img
                src="./assets/images/plate__french-fries.png"
                alt="hot chips with tomato sauce"
              />
              <div className="price price__large">$2.23</div>
              <button className="item__add-remove button__active">
                <span className="button__content">In Cart</span>
              </button>
            </li>
            <li className="menu__item">
              <h3 className="item__description">Salmon and Vegetables</h3>
              <img
                src="./assets/images/plate__salmon-vegetables.png"
                alt="salmon and vegetables"
              />
              <div className="price price__large">$5.12</div>
              <button className="item__add-remove">
                <span className="button__content">Add to Cart</span>
              </button>
            </li>
            <li className="menu__item">
              <h3 className="item__description">Spaghetti with Sauce</h3>
              <img
                src="./assets/images/plate__spaghetti-meat-sauce.png"
                alt="spaghetti with sauce"
              />
              <div className="price price__large">$7.82</div>
              <button className="item__add-remove">
                <span className="button__content">Add to Cart</span>
              </button>
            </li>
            <li className="menu__item">
              <h3 className="item__description">Bacon and Eggs</h3>
              <img
                src="./assets/images/plate__bacon-eggs.png"
                alt="bacon and eggs"
              />
              <div className="price price__large">$3.44</div>
              <button className="item__add-remove">
                <span className="button__content">Add to Cart</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div id="cart" className="panel panel__cart">
        <h2>Your Cart</h2>
        {/* <p>Your cart is empty</p> */}
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
    </section>
  );
};

export default App;
