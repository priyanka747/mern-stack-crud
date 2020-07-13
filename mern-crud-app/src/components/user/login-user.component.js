import React, { Component } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios';

export default class UserLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });

    }
    onSubmit(e) {
        e.preventDefault()
        const User = {
            email: this.state.email,
            password: this.state.password
        }
        // console.log(User);
        axios.post('http://localhost:5000/api/users/login', User)
            .then(res => {
                localStorage.setItem('usertoken', res.data)
                // return res.data
                if (res.data) {
                    this.props.history.push('/')
                }
            }).catch(err => {
                console.log("error: " + err)
            })
       
    }
    render() {
        return (

            <div className="container">
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" 
                        className="form-control" 
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" 
                          name="password"
                          value={this.state.password}
                          onChange={this.onChange}
                        className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        );
    }
}


// export deexport default fault ;