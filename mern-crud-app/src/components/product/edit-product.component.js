import React, { Component } from 'react';
import moment from "moment";
import axios from 'axios';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import jwt_decode from 'jwt-decode'
export default class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            product_name: "",
            product_description: "",
            product_price: 0,
            date_create: moment().format("DD-MM-YYYY hh:mm:ss"),
            errors: {
                name: '',
                desc: '',
                price: '',
                submit: ''
            }            
        };
    }
    componentDidMount() {
        const token = localStorage.getItem('usertoken');
        if (token) {
            const decode = jwt_decode(token);
            // console.log(decode);
        }
        if (!token) {
           this.props.history.push('/');
        }
        axios.get('http://localhost:5000/api/products/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    errors: {
                        name: '',
                        desc: '',
                        price: '',
                        submit: ''
                    },
                    product_name: res.data.product_name,
                    product_description: res.data.product_description,
                    product_price: res.data.product_price,
                    date_create: res.data.date_create
                });
                // console.log(this.state);
            }
            ).catch(err => console.log(err))
    }
    onChangeProductName(e) {
        this.setState({
            errors: {
                name: e.target.value.length < 5 ? "Product Name must be 5 characters long!" : "",
                desc: this.state.errors.desc,
                price: this.state.errors.price,
                submit: this.state.errors.submit
            }
        });
        this.setState({ product_name: e.target.value});
    }
    onChangeProductDescription(e) {
        this.setState({
            errors: {
                name: this.state.errors.name,
                desc: e.target.value.length < 5 ? "Product description is required" : "",
                price: this.state.errors.price,
                submit: this.state.errors.submit
            }
        });
        this.setState({ product_description: e.target.value });
    }
    onChangeProductPrice(e) {
        const { errors } = this.state;
        this.setState({
            errors: {
                name: errors.name,
                desc: this.state.errors.desc,
                price: isNaN(e.target.value)
                    ? "Price must be  valid number!"
                    : "",
                submit: this.state.errors.submit
            }
        });
        this.setState({ product_price: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            errors: {
                name: this.state.product_name.length <= 0 ? "product name required" : "",
                desc: this.state.product_description.length > 5 ? "" : "description is required",
                price: this.state.product_price.length <= 0 || this.state.product_price <= 0 ? "product price required" : "",
                submit: ((this.state.errors.price.length > 0) || (this.state.errors.name.length > 0) || (this.state.errors.desc.length > 0)) ? "Enter valid information" : ""
            }
        });
        // console.log(this.state);
        // console.log((this.state.product_price > 0) && (this.state.product_name.length > 0) && (this.state.product_price.length > 0));
        if ((this.state.errors.price.length > 0) || (this.state.errors.name.length > 0) || (this.state.errors.desc.length > 0)) {
           
            // console.log(this.state.errors);
        } else if (this.state.product_price > 0 && this.state.product_name.length > 0 && this.state.product_description.length > 0) {
            
            // console.log(this.state);
            const newProduct = {
                product_name: this.state.product_name,
                product_description: this.state.product_description,
                product_price: this.state.product_price,
                date_create: moment().format("DD-MM-YYYY hh:mm:ss")
            }
            // console.log(newProduct);
            axios.post('http://localhost:5000/api/products/'+ this.props.match.params.id, newProduct)
                .then(res => console.log(res.data));
            // console.log("form submited "); 
            this.props.history.push("/products");
            this.setState({
                errors: {
                    name: '',
                    desc: '',
                    price: '',
                    submit: ''
                },
                product_name: "",
                product_description: "",
                product_price: 0,
                date_create: moment().format("DD-MM-YYYY hh:mm:ss")
            });

        }

    }
    render() {
        const { errors } = this.state;
        return (
            <div className="card p-1 m-4">
                <div className="card-header">
                    <div className="row">
                        <div className="col"> <h3 className="card-title">Edit Product</h3></div>

                    </div>

                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        {errors.submit.length > 0 ? <span className='text-danger'>{errors.submit}</span> : ""}
                        <div className="form-group">
                            <label>Product name</label>
                            <input type="text"
                                className="form-control" 
                                value={this.state.product_name} 
                                onChange={this.onChangeProductName} 
                                placeholder="product name" />
                            {errors.name.length > 0 ?
                                <span className='text-danger'>{errors.name}</span> : ""}
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Description</label>
                            <textarea value={this.state.product_description} onChange={this.onChangeProductDescription} className="form-control" aria-label="With textarea" placeholder="description of product"></textarea>
                            {errors.desc.length > 0 ? <span className='text-danger'>{errors.desc}</span> : ""}
                        </div>
                        <div className="form-group">
                            <label >Price: </label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input className="form-control-lg" type="text" value={this.state.product_price} onChange={this.onChangeProductPrice} placeholder="Price of the product" />

                            </div>
                            {errors.price.length > 0 ? <span className='text-danger'>{errors.price}</span> : ""}
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>);
    }
}