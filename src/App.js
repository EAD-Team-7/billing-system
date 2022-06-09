import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import data from "./mock-data.json";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import apiUrl from "./api/config";
import {
  TableSortLabel,
  TableBody,
  TableFooter,
  Typography,
  Input,
  Button,
  FormLabel,
  TextField,
  Autocomplete,
  FormControl,
  Stack,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import axios from "axios";

const App = () => {
  const columns = [
    { field: "pid", headerName: "Product Id", width: 70 },
    { field: "productName", headerName: "Product Name", width: 130 },
    { field: "quantity", headerName: "Quantity", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
  ];

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
    console.log(formData);
    axios
      .get(`${apiUrl}/product`, {
        params: {
          search: parseInt(query),
        },
      })
      .then((res) => {
        const data = res.data[0];
        console.log(res.data[0]);
        const item = {
          pid: data.barcode,
          productName: data.name,
          quantity: 1,
          price: data.price,
        };
        setProducts((prevState) => {
          return [...prevState, item];
        });
      });
    for (let i = 0; i < products.length; i++) {
      if (products[i].pid === parseInt(query)) {
        return;
      }
    }
    const datax = data.map((item) => {
      if (item.pid === parseInt(query)) {
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
    var prods = products.map((item) => {
      return {
        product: item.pid,
        quantity: item.quantity,
      };
    });
    console.log(prods);
    axios.post(apiUrl + "/bill", {
      bill_items: prods,
      phoneNumber: data.get("phonenumber"),
      name: data.get("username"),
    });
    setProducts([]);
  };
  const [searchProduct, setsearchProduct] = useState([]);
  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    setQuery(e.target.value);
    axios
      .get(`${apiUrl}/product`, {
        params: {
          search: e.target.value,
        },
      })
      .then((res) => {
        let arr = [];
        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index];
          arr.push({
            label: element.barcode + " - " + element.name,
            value: element.barcode,
          });
        }
        setsearchProduct(arr);
      });
  };
  return (
    <div className="app-container">
      <h1 style={{ color: "#1c474c" }}>Date: {date}</h1>
      <form onSubmit={handleSubmit}>
        <div className="userInput">
          <FormControl>
            <TextField
              fullWidth
              id="username"
              label="Username"
              name="username"
              variant="outlined"
              sx={{ input: { color: "black" } }}
            />
          </FormControl>
          <FormControl>
            <TextField
              fullWidth
              id="email"
              label="email"
              name="email"
              variant="outlined"
              sx={{ input: { color: "black" } }}
            />
          </FormControl>
          <TextField
            id="phonenumber"
            label="Phone Number"
            variant="outlined"
            name="phonenumber"
            sx={{ input: { color: "black" } }}
          />
          <Button
            variant="contained">
            Submit
          </Button>
        </div>
      </form>
      <form onSubmit={handleAddFormSubmit} ref={formRef}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <Stack sx={{ flexDirection: "row" }} spacing={1}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                variant="outlined"
                options={searchProduct}
                sx={{ width: 300, input: { color: "black" } }}
                renderInput={(params) => {
                  console.log(params);
                  return (
                    <TextField
                      name="pid"
                      onChange={handleSearch}
                      required={true}
                      {...params}
                      label="Product ID: "
                    />
                  );
                }}
              />
              <Button type="submit" variant="contained">
                Add
              </Button>
            </Stack>
          </div>
        </div>
      </form>
      {/* <table>
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
              <td>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => {
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
      </table> */}
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((headCell) => (
                <TableCell key={headCell.field}>
                  <Typography variant="h4">{headCell.headerName}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <>
                <TableRow
                  key={products.indexOf(product)}
                  sx={{
                    backgroundColor: "white",
                  }}
                >
                  <TableCell>
                    <Typography color={"black"}>{product.pid}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={"black"}>
                      {product.productName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={"black"}>
                      <Input
                        sx={{
                          color: "black",
                        }}
                        value={product.quantity}
                        onChange={(e) => {
                          setProducts((prevState) => {
                            prevState[prevState.indexOf(product)].quantity =
                              +e.target.value;
                            return [...prevState];
                          });
                        }}
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={"black"}>
                      {product.quantity * product.price}
                    </Typography>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box
        style={{
          position: "fixed",
          bottom: "15px",
          right: "15px",
          fontSize: 20,
        }}
      >
        <Typography color={"black"} variant="h1">
          Total : {total}
        </Typography>
      </Box>
    </div>
  );
};

export default App;
