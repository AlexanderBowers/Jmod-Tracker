//import Button from 'react-bootstrap/Button';
import React from 'react';
//import {NavLink} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import {Nav} from 'react-bootstrap'
//import Search from './Search'

const NavigationBar = (props) => {

  const logout = () => {
    localStorage.removeItem("token","user")
    window.location.href = "/"
  }

  function loggedIn  () {
    let token = localStorage.getItem("token")
      if (token) {
           return(
            <Navbar bg="transparent" variant="dark" >
              <Container className="jHeader">
                <Nav className="mr-auto">
                  <Nav.Link href="/about"> About</Nav.Link>
                  <Nav.Link href="/"> Jmods </Nav.Link>
                  <Nav.Link href="/feed"> Feed </Nav.Link>
                  <Nav.Link href="/profile"> My Profile</Nav.Link>
                  <Nav.Link href="#" onSelect={logout}> Logout</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
           )
      } else {
        return (
          <Navbar bg="transparent" variant="dark" >
            <Container className="jHeader">
              <Nav className="mr-auto">
                <Nav.Link href="/about"> About</Nav.Link>
                <Nav.Link href="/"> Jmods </Nav.Link>
                <Nav.Link href="/feed"> Feed </Nav.Link>
                <Nav.Link href="/profile"> My Profile</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        )
      }
  }

    
    return (
      <div>
        {loggedIn()}
      </div>
    )
}

export default NavigationBar;