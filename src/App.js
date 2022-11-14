import './App.css';
import { useState, useEffect } from "react";
import groceryData from "./assets/grocery_data.json";
import GroceryItem from "./components/GroceryItem.js";

groceryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function App() {
  const [cart, setCart] = useState({items: {}, price: 0})
  const [data, setData] = useState(groceryData);
  const [sortType, setSortType] = useState();
  const [filterItems, setFilterItems] = useState(groceryData);
  const [filterType, setFilterType] = useState("All");
  const [filterAvailable, setFilterAvailable] = useState("All");

  const addToCart = (index) => {
    const item = data[index]
    const name = item.name
    const currentCart = cart.items

    if (name in currentCart){
      currentCart[name] += 1
    }
    else{
      currentCart[name] = 1
    }

    const total = cart.price + item.price
    setCart({items: currentCart, price: total})
  }

  const removeFromCart = (index) => {
    const item = data[index]
    const name = item.name
    const currentCart = cart.items

    if (name in currentCart){
      currentCart[name] -= 1
      const total = cart.price - item.price
      setCart({items: currentCart, price: total})

      if (currentCart[name] === 0){
        delete currentCart[name]
      }
    }
  }

  useEffect(() => {
    const sortItems = type => {
      const types = {
        price: 'price',
        rating: 'rating'
      };
      const sortProperty = types[type];
      const sorted = [...data].sort((a, b) => b[sortProperty] - a[sortProperty]);
      setData(sorted);
      setFilterItems(sorted);
    };

    sortItems(sortType);
  }, [sortType, filterType, filterAvailable]);


  useEffect(() => {
      const filterItemByType = type => {
        if (type !== "All"){
          const filtered = [...groceryData].filter(item => item.type === type);
          setData(filtered);
          setFilterItems(filtered);
        }
        else{
          setData(groceryData);
          setFilterItems(groceryData);
        }
      }

      filterItemByType(filterType);
  }, [filterType]);


  useEffect(() => {
    const filterItemByAvailable = available => {
      if (available !== "All"){
        console.log(available)
        const filtered = [...filterItems].filter(item => item.available.includes(available));
        setData(filtered);
      }
      else{
        setData(filterItems);
      }
    }

    filterItemByAvailable(filterAvailable);
}, [filterAvailable]);


  return (
    <div className="App">
      <div>
        <img className='title' src={require('./title.png')} alt="title image"/>
      </div>

      <div className='content'>
        <div className='filter-area'>
          <h3 style={{paddingLeft: "0.4rem"}}>Sort By</h3>
          <form action="" method="post">
            <input type="radio" name="sort" value="price" onClick={(e) => setSortType(e.target.value)}/> Price
            <br></br>
            <br></br>
            <input type="radio" name="sort" value="rating" onClick={(e) => setSortType(e.target.value)}/> Rating
          </form>

          <br></br>

          <h3 style={{paddingLeft: "0.5rem"}}>Types</h3>
          <div>
            <input type="checkbox" id="all" name="types" checked={filterType === "All"} onChange={() => setFilterType("All")}/>
            <label for="fruits"> All</label>
            <br></br>
            <br></br>
            <input type="checkbox" id="fruits" name="types" checked={filterType === "Fresh Fruits"} onChange={() => setFilterType("Fresh Fruits")}/>
            <label for="fruits"> Fresh Fruits</label>
            <br></br>
            <br></br>
            <input type="checkbox" id="beverages" name="types" checked={filterType === "Beverages"} onChange={() => setFilterType("Beverages")}/>
            <label for="beverages"> Beverages</label>
            <br></br>
            <br></br>
            <input type="checkbox" id="dairy&eggs" name="types" checked={filterType === "Dairy & Eggs"} onChange={() => setFilterType("Dairy & Eggs")}/>
            <label for="dairy&eggs"> Dairy & Eggs</label>
            <br></br>
            <br></br>
            <input type="checkbox" id="bakery&bread" name="types" checked={filterType === "Bakery & Bread"} onChange={() => setFilterType("Bakery & Bread")}/>
            <label for="bakery&bread"> Bakery & Bread</label>
            <br></br>
            <br></br>
            <input type="checkbox" id="meat&seafood" name="types" checked={filterType === "Meat & Seafood"} onChange={() => setFilterType("Meat & Seafood")}/>
            <label for="meat&seafood"> Meat & Seafood</label>
          </div>

          <br></br>
                
          <h3 style={{paddingLeft: "0.5rem"}}>Available</h3>
          <div>
            <input type="checkbox" id="all" name="available" checked={filterAvailable === "All"} onChange={() => setFilterAvailable("All")}/>
            <label for="pickup"> All</label>
            <br></br>
            <br></br>
            <input type="checkbox" id="pickup" name="available" checked={filterAvailable === "Pickup"} onChange={() => setFilterAvailable("Pickup")}/>
            <label for="pickup"> Pickup</label>
            <br></br>
            <br></br>
            <input type="checkbox" id="delivery" name="available" checked={filterAvailable === "Delivery"} onChange={() => setFilterAvailable("Delivery")}/>
            <label for="delivery"> Delivery</label>
          </div>

        </div>

        <div className='groceryItems'>
          {data.map((item, index) => (
          <GroceryItem item={item} addToCart={addToCart} removeFromCart={removeFromCart} count= {item.name in cart.items ? cart.items[item.name] : 0} index={index}></GroceryItem>
          ))}
        </div>

        <div className="cart">
            <h2>Shopping Cart</h2>
            {Object.keys(cart.items).map((key) => (
              <p>{cart.items[key]}x {key}</p>
            ))}
            <p>Total: ${Math.round(cart.price * 100) / 100}</p>
          </div>

      </div>
    </div>
  );
}

export default App;