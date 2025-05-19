import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./assets/components/Home";
import NavBar from "./assets/components/NavBar";
import Login from "./assets/pages/Login";
import Register from "./assets/pages/Register";
import EditBlog from "./assets/pages/EditBlog";
import AddBlog from "./assets/pages/AddBlog";
import NotFound from "./assets/components/NotFound";

// ALL THE LOGIC FOR THE WHOLE APP IS HERE AND PASSED TO THE OTHER COMPONENTS //

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<AddBlog />} />
          {/* edit by ID --> /edit/:id */}
          <Route path="/edit/:id" element={<EditBlog />} />
          {/* <Route path='/test' element={<TestPB/>}/> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <h1></h1>
    </>
  );
}

export default App;
