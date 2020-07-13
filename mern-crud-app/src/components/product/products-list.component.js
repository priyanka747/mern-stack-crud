import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link, Switch, useHistory } from "react-router-dom";

// import {browserHistory} from "react-router";

// eslint-disable-next-line
import axios from 'axios';

const Product = props => (
    <tr>
        <td>{props.index}</td>
        <td>{props.product.product_name}</td>
        <td>{props.product.product_description}</td>
        <td>{props.product.product_price}</td>
        <td>{props.product.date_create}</td>
        <td><div className="d-flex justify-content-around"><span className="nav-link" onClick={() => { window.location.href = '/products/edit/' + props.product._id }} ><FontAwesomeIcon icon={faEdit} /></span> <Link className="text-danger " to={"/products/delete/" + props.product._id}><FontAwesomeIcon icon={faTrash} /></Link></div></td>
    </tr>
)
export default class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {

            products: [],
            product_name: "",
            product_description: "",
            product_price: 0,
            date_create: ""
        };

    }
    loadproducts() {
        axios.get('http://mern-stack-crud-app.herokuapp.com/api/products/')
            .then(res => {
                this.setState({
                    products: res.data.reverse()
                });
            }).catch(err => console.log(err))
    }
    componentDidMount() {
        const token = localStorage.getItem('usertoken');
        if (token) {
            // const decode = jwt_decode(token);
            // console.log(decode);
        }
        if (!token) {
           this.props.history.push('/');
        }
        this.loadproducts();
    }
    componentDidUpdate() {
        this.loadproducts();
    }
    productList() {
        return this.state.products.map(function (product, i) {
            return <Product product={product} index={i + 1} key={i} />

        });
    }

    render() {
        return (
            <Router>

                <div className="card p-1 m-4">
                    <div className="card-header">
                        <div className="row">
                            <div className="col"> <h3 className="card-title">Products</h3></div>

                            <div className="col">
                                <button className="btn btn-primary float-right" onClick={() => { window.location.href = '/products/add' }}>Add New Product
        </button>
                            </div>
                        </div>

                    </div>
                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead >
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>price</th>
                                    <th>Date Created</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.productList()}


                            </tbody>
                        </table>
                    </div>
                </div>

            </Router>
        );
    }
}

// export deexport default fault ;