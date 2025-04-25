import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";
import Cart from "./assets/components/Cart";
import NavBar from "./assets/components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import NotFound from "./assets/components/NotFound";
import About from "./pages/About";
import AboutCompany from "./pages/AboutCompany";
import AboutPeople from "./pages/AboutPeople";
import Countries from "./pages/Countries";


function App() {
  // gets a random element position x,y and 
  const generateRandomCountry = () => {
    const min = 1;
    const max = 6;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
};

  const [elements, setElements] = useState(() => ([
    ["Egypt", "Cairo"],
    ["France", "Paris"],
    ["UK", "London"],
  ]));

  const randomCountry = (array) => {
    const randomNum = Math.floor(Math.random() * array.length)
    const newArray = elements.map(
      
    )
  }

  // const flattenArray = () => {
  //   const newArray = Math.random(elements.flat());
  //   // setElements(newArray);
  //   console.log("????");
  // };

  const [items, setItems] = useState([
    { id: 1, name: "Burger", count: 0 },
    { id: 2, name: "Pizza", count: 0 },
    { id: 3, name: "Fries", count: 0 },
  ]);

  const handleInc = (id) => {
    const newItems = items.map((itm) => {
      if (itm.id === id) {
        itm.count++;
        return itm;
      } else {
        return itm;
      }
    });
    setItems(newItems);
  };

  const handleDec = (id) => {
    const newItems = items.map((itm) => {
      if (itm.id === id && itm.count > 0) {
        itm.count--;
        return itm;
      } else {
        return itm;
      }
    });
    setItems(newItems);
  };

  const handleReset = () => {
    const newItems = items.map((itm) => ({ ...itm, count: 0 }));
    setItems(newItems);
  };

  const handleDel = (id) => {
    const cartCount = items.filter((item) => {
      if (item.id !== id) {
        return item;
      }
    });
    setItems(cartCount);
  };

  const handleEmptyCart = () => {
    if (items.length === 0) {
      // console.log('trueeee');
      return true;
    } else {
      // console.log('falseeee');
      return false;
    }
  };

  return (
    <>
      <BrowserRouter>
        <NavBar noOfItems={items.length} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>}>
              <Route path="people" element={<AboutPeople/>} />
              <Route path="company" element={<AboutCompany/>} />
          </Route>
          <Route path="/cart" element={<Cart
            handleDec={handleDec}
            handleEmptyCart={handleEmptyCart}
            handleInc={handleInc}
            handleReset={handleReset}
            handleDel={handleDel}
            items={items}
          />}/>
          <Route path="/countries" element={<Countries elements={elements}/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
