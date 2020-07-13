    import React, { Component } from 'react';
    // eslint-disable-next-line
    import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
    import axios from 'axios';
    
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

// import jwt_decode from 'jwt-decode'
    const Customer = props =>(
       
        <tr>
            <td>{props.customer.cust_id}</td>
            <td>{props.customer.cust_name}</td>
            <td>{props.customer.cust_email}</td>
            <td>{props.customer.cust_address}</td>
            <td>{props.customer.approved?<FontAwesomeIcon className="text-success" icon={faCheck} />:<FontAwesomeIcon className="text-danger" icon={faTimes} />}</td>
            <td><div className="d-flex justify-content-around"><span className="nav-link" onClick={()=>{window.location.href='/customers/edit/'+ props.customer._id}} ><FontAwesomeIcon icon={faEdit} /></span></div></td>
        </tr>
    )
export default class CustomerList extends Component {
        constructor(props) {
            super(props);
            this.state = {
                customers:[],
                product_name: "",
                product_description: "",
                product_price: 0,
                date_create:""
            };
        }
        loadCustomers() {
            axios.get('http://localhost:5000/api/customers/')
            .then(res =>{
                this.setState({
                    customers:res.data
                });
            } ).catch(err=>console.log(err))
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
            this.loadCustomers();
        }
        componentDidUpdate() {
            this.loadCustomers();
        }
      
        customerList(){
            // console.log(this.state.customers);
            return this.state.customers.map(function(customer,i){
                return <Customer customer={customer} key={i}/>
    
            })
        }
        render() {
            return (
    
                <div className="card p-1 m-4">
                    <div className="card-header">
                        <div className="row">
                            <div className="col"> <h3 className="card-title">Customers</h3></div>
                        </div>
                       
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead >
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Approved</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.customerList()}
                                    
                               
                            </tbody>
                        </table>
                    </div>
                </div>
    
            );
        }
    }
    
    // export deexport default fault ;