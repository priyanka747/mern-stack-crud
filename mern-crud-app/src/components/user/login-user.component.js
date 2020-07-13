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
        console.log(User);
        axios.post('http://localhost:4000/users/login', User)
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
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" 
                        class="form-control" 
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" 
                          name="password"
                          value={this.state.password}
                          onChange={this.onChange}
                        class="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>

        );
    }
}


// export deexport default fault ;