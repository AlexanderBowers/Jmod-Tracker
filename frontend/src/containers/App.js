import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
import Profile from '../components/Profile'
import Login from '../components/Login'
import Signup from '../components/Signup'
import HomeContainer from './HomeContainer'
import Logout from '../components/Logout'
import HomePage from './HomePage'

class App extends Component {


  componentDidMount() {
  }

  handleUserInfo = (info) => {
    this.setState({
      userId: info
    })
  }
  


  render() {
    return (
      
      <Router>
        <div  >
          <NavigationBar signOut={this.signOut} />
          <div>
          <Route exact path='/' render={routerProps => <HomeContainer {...routerProps} handleUserInfo={this.handleUserInfo} />} />
          <Route exaxt path='/home' render={routerProps => <HomePage {...routerProps} /> } />
          </div>
        </div>
      </Router>
    );
  }



}

export default App;