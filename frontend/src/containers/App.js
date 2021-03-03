import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
//import Profile from '../components/Profile'
//import Login from '../components/Login'
//import Signup from '../components/Signup'
import HomeContainer from './HomeContainer'
//import Logout from '../components/Logout'
import HomePage from './HomePage'

class App extends Component {

  state = {
    jmod: "",
    query: ""
  }

  handleChange = (e) => {
    let query =  e.target.value
    this.setState({query})
  }

  searchMod = (e) => {
    e.preventDefault()
    let token = localStorage.getItem("token")
    fetch('http://localhost:3000/jmods', {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify({
            name: `${this.state.query}`
        })
    })
    .then(res => res.json())
    .then(jmod => this.setState({jmod}))
}


  componentDidMount() {
  }

  handleUserInfo = (userId) => {
    this.setState({userId})
  }

  activeMod = (jmod) => {
    this.setState({jmod})

}
  


  render() {
    return (
      
      <Router>
        <div  >
          <NavigationBar signOut={this.signOut} searchMod={this.searchMod} handleChange={this.handleChange}/>
          <div>
          <Route exact path='/' render={routerProps => <HomeContainer {...routerProps} handleUserInfo={this.handleUserInfo} />} />
          <Route exaxt path='/home' render={routerProps => <HomePage {...routerProps} jmod={this.state.jmod} activeMod={this.activeMod}/>  } />
          </div>
        </div>
      </Router>
    );
  }



}

export default App;