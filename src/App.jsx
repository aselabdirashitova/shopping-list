
import React, { useState, useEffect } from "react";
import ShoppingItem from "./ShoppingItem.jsx";
import "./App.css";

function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [budget, setBudget] = useState(() => {
    return localStorage.getItem("budget") || "";
  });

  // Сохраняем список покупок
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Сохраняем бюджет
  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  // Добавление товара
  function addProduct() {
    if (name.trim() === "" || price === "" || Number(price) <= 0) {
      alert("Введите название и правильную цену");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: name,
      price: Number(price),
      bought: false
    };

    setProducts([...products, newProduct]);
    setName("");
    setPrice("");
  }

  // Удаление товара
  function deleteProduct(id) {
    setProducts(products.filter(product => product.id !== id));
  }

  // Отметить товар как купленный
  function toggleBought(id) {
    const newProducts = products.map(product => {
      if (product.id === id) {
        return { ...product, bought: !product.bought };
      }
      return product;
    });

    setProducts(newProducts);
  }

  // Очистить весь список
  function clearProducts() {
    if (window.confirm("Удалить все товары?")) {
      setProducts([]);
    }
  }

  // Общая стоимость
  let total = 0;
  let boughtCount = 0;

  for (let product of products) {
    total = total + product.price;

    if (product.bought) {
      boughtCount++;
    }
  }

  const remaining = Number(budget) - total;

  return (
    <div className="app">
      <h1>🛒 Список покупок</h1>
      <p className="subtitle">Планируй свои покупки</p>

      <h2>Добавить товар</h2>

      <input
        type="text"
        placeholder="Название товара"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Цена в сомах"
        min="0"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button className="add-button" onClick={addProduct}>
        + Добавить
      </button>

      <div className="budget">
        <h2>Мой бюджет</h2>

        <input
          type="number"
          placeholder="Введите бюджет"
          min="0"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>

      <h2>Мои покупки ({products.length})</h2>

      {products.length === 0 && (
        <p className="empty">Список пока пуст 🛍️</p>
      )}

      {products.map(product => (
        <ShoppingItem
          key={product.id}
          product={product}
          deleteProduct={deleteProduct}
          toggleBought={toggleBought}
        />
      ))}

      {products.length > 0 && (
        <>
          <p className="count">
            Куплено: {boughtCount} из {products.length}
          </p>

          <button className="clear-button" onClick={clearProducts}>
            Очистить список
          </button>
        </>
      )}

      <div className="total">
        <h2>Итого: {total} сом</h2>

        {budget !== "" && Number(budget) >= 0 && (
          <p className={remaining >= 0 ? "good" : "bad"}>
            {remaining >= 0
              ? "Осталось: " + remaining + " сом"
              : "Превышен бюджет на " + Math.abs(remaining) + " сом"}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
