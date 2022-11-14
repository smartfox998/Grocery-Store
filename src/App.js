import './App.css';
import { useState, useEffect } from "react";
import groceryData from "./assets/grocery_data.json";
import DisplayList from "./components/DisplayList";
import TypeFilter from "./components/TypeFilter";
import AvailableFilter from './components/AvailableFilter';
import Cart from './components/Cart';

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

  useEffect(() => {
    const sortItems = type => {
      const sortProperty = type;
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
          const sorted = [...filtered].sort((a, b) => b[sortType] - a[sortType]);
          setData(sorted);
          setFilterItems(sorted);
        }
        else{
          const sorted = [...groceryData].sort((a, b) => b[sortType] - a[sortType]);
          setData(sorted);
          setFilterItems(sorted);
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
          <form>
            <input type="radio" name="sort" value="price" onClick={(e) => setSortType(e.target.value)}/> Price
            <br></br>
            <br></br>
            <input type="radio" name="sort" value="rating" onClick={(e) => setSortType(e.target.value)}/> Rating
          </form>

          <br></br>

          <TypeFilter filterType={filterType} setFilterType={setFilterType}></TypeFilter>

          <br></br>
                
          <AvailableFilter filterAvailable={filterAvailable} setFilterAvailable={setFilterAvailable}></AvailableFilter>
        </div>

        <DisplayList data={data} cart={cart} setCart={setCart}></DisplayList>

        <div className="cart">
          <Cart cart={cart}></Cart>
        </div>

      </div>
    </div>
  );
}

export default App;