import React, { Component } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

// importing components
import Navbar from "./layout/navigation.component"
import Home from "./components/home.component"
import NotFound from './components/notfound.component';
import ProductList from "./components/product/products-list.component"
import CustomerList from "./components/customer/customers-list.component"
import AddProduct from "./components/product/add-product.component";
import  EditCustomer  from "./components/customer/edit-customer.component";
import EditProduct from "./components/product/edit-product.component";
import Login from "./components/user/login-user.component";
class App extends Component {
  render() {
    return (

      <Router>
        <div className="container">
          <Navbar />

          <Switch>
          <Route path="/" exact component={Home}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route exact path="/products/add" component={AddProduct}></Route>
            <Route exact path="/products" component={ProductList}></Route>
            <Route exact path="/products/edit/:id" component={EditProduct}></Route>
            <Route exact path="/customers" component={CustomerList}></Route>
            <Route exact path="/customers/edit/:id" component={EditCustomer}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>

      </Router >
    );
  }
}

export default App;
