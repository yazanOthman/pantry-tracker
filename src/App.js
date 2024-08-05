import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import axios from "axios";
import Modal from "./components/Modal";

const getUnique = (products, value) => {
  return [...new Set(products.map((product) => product[value]))];
};

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const getProducts = async () => {
    try {
      const res = await axios.get(`${axios.defaults.baseURL}/products`);
      const result = res?.data;
      setProducts(result);
      getCategories(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = (products) => {
    let categoryList = [];
    if (products.length) {
      categoryList = getUnique(products, "slug");
    }
    setCategories(categoryList);
  };

  useEffect(() => {
    getProducts();
  });

  useEffect(() => {
    getCategories(products);
  }, [products]);

  return (
    <>
      <Navbar HandleModalOpen={() => setIsOpen(true)} />
      <Routes>
        <Route path="/" element={<Categories categories={categories} />} />
        <Route
          path="/:sluge"
          element={
            <Products
              initialProducts={products}
              onRemove={() => getProducts()}
            />
          }
        />
      </Routes>
      {isOpen && (
        <Modal
          categories={categories}
          onClose={() => setIsOpen(false)}
          onSubmit={() => getProducts()}
        />
      )}
    </>
  );
}

export default App;
