import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css'
import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
import Profile from '../components/Profile'
import HomePage from '../components/HomePage'
import HomeContainer from './HomeContainer'
import JmodPage from './JmodPage'
import FeedPage from './FeedPage'

class App extends Component {

  state = {
    jmod: "",
    query: "",
    follows: []
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
    let follows = localStorage.getItem('follows')
    if (follows) {
      this.setState(prevState => ({
        follows: JSON.parse(follows)
      }))
    }
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
          <div className="test">
          <Route exact path='/' render={routerProps => <HomeContainer {...routerProps} handleUserInfo={this.handleUserInfo} />} />
          <Route exact path='/home' render={routerProps => <HomePage {...routerProps}/>  } />
          <Route exact path='/jmods' render={routerProps => <JmodPage {...routerProps} jmod={this.state.jmod} activeMod={this.activeMod}/>  } />
          <Route exact path='/feed' render={routerProps => <FeedPage {...routerProps} jmod={this.state.jmod} activeMod={this.activeMod}/>  } />
          <Route exact path='/profile' render={routerProps => <Profile {...routerProps} /> } />
          </div>
        </div>
      </Router>
    );
  }



}

export default App;