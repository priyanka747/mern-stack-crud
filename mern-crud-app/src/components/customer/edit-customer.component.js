import React, { Component } from 'react';
import axios from 'axios';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import jwt_decode from 'jwt-decode'
export default class EditCustomer extends Component {
    constructor(props) {
        super(props);
        
        this.onCustApprovedChanged = this.onCustApprovedChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            cust_id: "",
            cust_name: '',
            cust_email: '',
            cust_address: '',
            approved: false
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
        axios.get('http://localhost:5000/api/customers/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    errors: {
                        cust_id: '',
                        cust_name: '',
                        cust_email: '',
                        cust_address: '',
                        approved: '',
                    },
                    cust_id: res.data.cust_id,
                    cust_name: res.data.cust_name,
                    cust_email: res.data.cust_email,
                    cust_address: res.data.cust_address,
                    approved: res.data.approved
                });
                // console.log(this.state);
            }
            ).catch(err => console.log(err))
    }
    onCustApprovedChanged(e) {
       
        this.setState({ approved: !this.state.approved });
        // console.log(this.state);
    }

    onSubmit(e) {
        e.preventDefault();
            const newCustomer = {
                cust_id: this.state.cust_id,
                cust_name: this.state.cust_name,
                cust_email: this.state.cust_email,
                cust_address: this.state.cust_address,
                approved: this.state.approved
            }
            // console.log(newCustomer);
            axios.post('http://localhost:5000/api/customers/' + this.props.match.params.id, newCustomer)
                .then(res => console.log(res.data));
            this.props.history.push("/customers");
            this.setState({
                cust_id: "",
                cust_name: '',
                cust_email: '',
                cust_address: '',
                approved: false
            });

    }
    render() {
        return (
            <div className="card p-1 m-4">
                <div className="card-header">
                    <div className="row">
                        <div className="col"> <h3 className="card-title">Edit Customer</h3></div>
                    </div>
                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text"
                                className="form-control-plaintext"
                                value={this.state.cust_name} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text"
                                className="form-control-plaintext"
                                value={this.state.cust_email} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Address</label>
                            <textarea value={this.state.cust_address} className="form-control-plaintext" aria-label="With textarea" placeholder="description of product" readOnly></textarea>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={ this.state.approved?true:''} onChange={this.onCustApprovedChanged }/>
                            <label className="form-check-label" htmlFor="exampleCheck1">Approved</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>);
    }
}