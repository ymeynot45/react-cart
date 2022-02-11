import React, {useState} from 'react';
import PropTypes from "prop-types";

import ItemPage from './ItemPage';
import {items} from "./static-data";
import Nav from './Nav';
import './App.css';

const summarizeCart = cart => {
  const groupItems = cart.reduce((summary, item) => {
    summary[item.id] = summary[item.id] || {
      ...item,
      count: 0
    };
    summary[item.id].count++;
  }, {});
  return Object.values(groupItems);
};

const App = () => {
  const [activeTab, setActiveTab] = useState('items');
  const [cart, setCart] = useState([]);

  const addToCart = item => {
      setCart(prevCart => [...prevCart, item]);
  }

  const removeItem = item => {
    let index = cart.findIndex(i => i.id === item.id);
    if (index >= 0) {
      setCart(cart => {
        const copy = [...cart];
        copy.splice(index,1);
        return copy;
      });
    }
  };

  //  --ANOTHER SECTION WHERE THE NOTES CODE DID NOT MATCH THE LIVE CODING
  return (
    <div className="App">
      <Nav activeTab={activeTab} onTabChange={setActiveTab}/>
      {/* <div>
        {cart.length} items  ---testing line
      </div> */}
      <main className="App-content">
        <Content tab={activeTab} onAddToCart={addToCart}
        onRemoveItem={removeItem}
          cart={summarizeCart(cart)}/>
      </main>
    </div>
  );
};

const Content = ({tab, onAddToCart, cart, onRemoveItem}) => {   // --CODE FROM VIDEO
  switch (tab) {
      default:  //not needed due to peter's addition.
      case 'items':
        return <ItemPage items={items} onAddToCart={onAddToCart}/>
      case 'cart':
        return <CartPage items={cart} onAddOne={onAddToCart} onRemoveOne={onRemoveItem}/>;
  }
};
Content.propTypes = {   //peter addition
  tab: PropTypes.oneOf(['items', 'cart'])
};

// --CODE FROM NOTES
// const Content = ({tab}) => {
//   switch (tab) {
//     case 'items':
//       return <ItemPage items={items}/>;
//     case 'cart':
//       return <span>he cart</span>
//     default:
//       return <p>Content: invalid tab '{tab}'</p>;
//   }
// };


export default App;