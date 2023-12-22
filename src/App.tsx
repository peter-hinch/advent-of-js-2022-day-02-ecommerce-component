import React, { useEffect, useState } from 'react';

import 'normalize.css';

import './App.css';

import baconEggs from './assets/images/plate__bacon-eggs.png';
import chickenSalad from './assets/images/plate__chicken-salad.png';
import fishSticksFries from './assets/images/plate__fish-sticks-fries.png';
import frenchFries from './assets/images/plate__french-fries.png';
import ravioli from './assets/images/plate__ravioli.png';
import salmonVegetables from './assets/images/plate__salmon-vegetables.png';
import spaghettiMeatSauce from './assets/images/plate__spaghetti-meat-sauce.png';
import tortellini from './assets/images/plate__tortellini.png';

interface MenuItem {
  id: number;
  description: string;
  image: any;
  price: number;
}

interface CartItem {
  id: number;
  qty: number;
}

const menuItems: MenuItem[] = [
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
    id: 8,
    description: 'Tortellini',
    image: tortellini,
    price: 100
  }
];

const salesTax: number = 0.0975;

// Currency format
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

const formatPrice = (price: number) => formatter.format(price / 100);

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddRemove = (id: number, newQty: number) => {
    const newItem = { id, qty: newQty };
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (prevItem) => prevItem.id === id
      );

      if (existingItemIndex !== -1) {
        if (newQty < 1) {
          return prevItems.filter((item) => item.id !== id);
        } else {
          return prevItems.map((item) => {
            if (item.id === id) {
              return newItem;
            }
            return item;
          });
        }
      } else {
        return [...prevItems, newItem];
      }
    });
    console.log('handleAddRemove', id, newQty);
  };

  return (
    <section className="container">
      <MenuComponent
        menuItems={menuItems}
        cartItems={cartItems}
        handleAddRemove={handleAddRemove}
      />
      <CartComponent
        cartItems={cartItems}
        handleAddRemove={handleAddRemove}
        salesTax={salesTax}
      />
    </section>
  );
};

const MenuComponent: React.FC<{
  menuItems: object[];
  cartItems: any[];
  handleAddRemove: Function;
}> = ({ menuItems, cartItems, handleAddRemove }) => {
  return (
    <div id="menu" className="panel panel__menu">
      <h2>To Go Menu</h2>
      <div className="panel__scroll-area">
        <ul id="menu__items">
          {menuItems.map((item: any) => {
            const isInCart: boolean = !!cartItems.find(
              (cartItem) => cartItem.id === item.id
            );
            return (
              <MenuItemComponent
                key={`menu-item-${item.id}`}
                item={item}
                isInCart={isInCart}
                handleAddRemove={handleAddRemove}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const MenuItemComponent: React.FC<{
  item: any;
  isInCart: boolean;
  handleAddRemove: any;
}> = ({ item, isInCart, handleAddRemove }) => {
  const newQty = isInCart ? 0 : 1;

  return (
    <li className="menu__item">
      <h3 className="item__description">{item.description}</h3>
      <img src={item.image} alt={item.description?.toLowerCase()} />
      <div className="price price__large">{formatPrice(item.price)}</div>
      <button
        className={`item__add-remove${isInCart ? ' button__active' : ''}`}
        onClick={() => handleAddRemove(item.id, newQty)}
      >
        <span className="button__content">
          {isInCart ? 'In Cart' : 'Add to Cart'}
        </span>
      </button>
    </li>
  );
};

const CartComponent: React.FC<{
  cartItems: CartItem[];
  handleAddRemove: Function;
  salesTax: number;
}> = ({ cartItems, handleAddRemove, salesTax }) => {
  const getMenuItem = (id: number) => menuItems.find((item) => item.id === id);

  const [subTotal, setSubTotal] = useState<number>(0);

  useEffect(() => {
    setSubTotal(
      cartItems.reduce((acc: number, item: CartItem) => {
        const menuItem: MenuItem | undefined = getMenuItem(item.id);
        return menuItem?.price ? acc + menuItem?.price * item.qty : acc;
      }, 0)
    );
  }, [cartItems]);

  return (
    <div id="cart" className="panel panel__cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="panel__scroll-area">
          <ul id="cart__items">
            {cartItems.map((cartItem) => (
              <CartItemComponent
                key={`cart-item-${cartItem.id}`}
                cartItem={cartItem}
                getMenuItem={getMenuItem}
                handleAddRemove={handleAddRemove}
              />
            ))}
          </ul>
          <hr />
          <div className="cart__totals">
            <div className="totals__label">Subtotal:</div>
            <div className="price price__large">{formatPrice(subTotal)}</div>
            <div className="totals__label">Tax:</div>
            <div className="price price__large">
              {formatPrice(subTotal * salesTax)}
            </div>
            <div className="totals__label">Total:</div>
            <div className="price price__large price__total">
              {formatPrice(subTotal + subTotal * salesTax)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CartItemComponent: React.FC<{
  cartItem: any;
  getMenuItem: Function;
  handleAddRemove: Function;
}> = ({ cartItem, getMenuItem, handleAddRemove }) => {
  const menuItem = getMenuItem(cartItem.id);

  return (
    <li className="cart__item">
      <h3 className="item__description">{menuItem.description}</h3>
      <div className="item__image-container">
        <img src={menuItem.image} alt={menuItem.description?.toLowerCase()} />
        <div className="image__count-badge">{cartItem.qty}</div>
      </div>
      <div className="price">{formatter.format(menuItem.price / 100)}</div>
      <div className="item__line">
        <div className="line__options">
          <button
            className="options__decrement"
            onClick={() => handleAddRemove(cartItem.id, cartItem.qty - 1)}
          ></button>
          <span className="options__qty">{cartItem.qty}</span>
          <button
            className="options__increment"
            onClick={() => handleAddRemove(cartItem.id, cartItem.qty + 1)}
          ></button>
        </div>
        <span className="price price__large">
          {formatPrice(menuItem.price * cartItem.qty)}
        </span>
      </div>
    </li>
  );
};

export default App;
