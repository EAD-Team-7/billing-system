import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import UserInfo from "./components/form/UserInfo";
import data from "./mock-data.json";
const App = () => {
  const formRef = useRef();
  const [products, setProducts] = useState([]);
  const [userinputs, setUserinputs] = useState({
    username: "",
    email: "",
    phonenumber: "",
  });
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal((prevState) => {
      let sumx = 0;
      for (let i = 0; i < products.length; i++) {
        sumx += products[i].quantity * products[i].price;
      }
      return sumx;
    });
  }, [products]);
  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const Cdata = {
      pid: parseInt(formData.get("pid")),
      productName: formData.get("productName"),
      quantity: formData.get("quantity"),
      price: formData.get("price"),
    };
    for (let i = 0; i < products.length; i++) {
      if (products[i].pid === Cdata.pid) {
        return;
      }
    }
    const datax = data.map((item) => {
      if (item.pid === Cdata.pid) {
        setProducts((prevState) => {
          return [...prevState, item];
        });
      }
    });
  };
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(Object.fromEntries(data.entries()));
  };
  return (
    <div className="app-container">
      <h1>Date: {date}</h1>
      <form onSubmit={handleSubmit}>
        <div className="userInput">
          <UserInfo name="username" placeholder="Username" />
          <UserInfo name="email" placeholder="Email" />
          <UserInfo name="phonenumber" placeholder="Phone Number" />
        </div>
        <button>Submit</button>
      </form>
      <form onSubmit={handleAddFormSubmit} ref={formRef}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Enter product ID:</label>
            <input
              type="text"
              name="pid"
              required="required"
              placeholder="Product ID: "
            />
            <button type="submit">Add</button>
          </div>
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={products.indexOf(product)}>
              <td>{product.pid}</td>
              <td>{product.productName}</td>
              {/* <td>{product.quantity}</td> */}
              <td>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => {
                    // e.product;

                    console.log(products);
                    setProducts((prevState) => {
                      prevState[prevState.indexOf(product)].quantity =
                        +e.target.value;
                      return [...prevState];
                    });
                  }}
                />
              </td>
              <td>{product.quantity * product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {total}
    </div>
  );
};

export default App;
