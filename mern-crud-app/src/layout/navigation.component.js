import React, { Component } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link ,withRouter, NavLink} from "react-router-dom";
class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    logOut(e){
      e.preventDefault()
      localStorage.removeItem('usertoken')
      this.props.history.push('/')
    }
    render() { 
      const loginRegLink=(
        <ul className="navbar-nav mr-auto">
                  <li className="nav-item "><NavLink exact to="/login" className="nav-link">Login</NavLink> </li>
                  <li className="nav-item"><NavLink exact to="/register" className="nav-link">Signup</NavLink> </li>
                </ul>
      )
      const userLinks=(
        <ul className="navbar-nav mr-auto">
                 
                  <li className="nav-item"><NavLink exact to="/customers" className="nav-link">Customers</NavLink> </li>
                  <li className="nav-item"><NavLink exact to="/products" className="nav-link">Products</NavLink> </li>
                  <li className="nav-item"><button  onClick={this.logOut.bind(this)} className="btn btn-link nav-link">logout </button> </li>
                </ul>
      )
        return (  
            <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
            <div className="container">
              <Link to="/" className="navbar-brand">MERN-CRUD-APP</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                  <li className="nav-item "><NavLink exact to="/" className="nav-link">Home</NavLink> </li>
                  </ul>
                {localStorage.usertoken?userLinks:loginRegLink}
              </div>
            </div>
          </nav>
        );
    }
}
 
export default withRouter(Navigation);