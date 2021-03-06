//import Button from 'react-bootstrap/Button';
import React from 'react';
//import {NavLink} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import {Nav} from 'react-bootstrap'
import Search from './Search'

const NavigationBar = (props) => {

  const logout = () => {
    localStorage.clear("token","user")
    window.location.href = "/"
  }

    
    return (
    <div >
            <Navbar bg="transparent" variant="dark" >
              <Container className="jHeader">
                <Nav className="mr-auto">
                  <Nav.Link href="/home"> Jmods </Nav.Link>
                  <Nav.Link href="/profile"> My Profile</Nav.Link>
                  <Search searchMod={props.searchMod} handleChange={props.handleChange}></Search>
                  <Nav.Link href="#" onSelect={logout}> Logout</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
    </div>
    )
}

export default NavigationBar;