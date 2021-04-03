import React, {Component} from 'react'
//import Button from 'react-bootstrap/Button'
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row'
//import Col from 'react-bootstrap/Col'
//import Search from '../components/Search';
import Jmod from '../components/Jmod'

class HomePage extends Component {

   state = {
       jmod: this.props.jmod
   }

    componentDidMount() {
        let token = localStorage.getItem("token")
        let old_feed = localStorage.getItem("old_feed")
        if (old_feed === null) {
            localStorage.setItem("old_feed", JSON.stringify({jagexFiller: {twitter: [], reddit: []}})) 
        }
        token ? (
        fetch(`http://localhost:3000/api/v1/profile`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                user: data.user.username
            })
        }))
        .then(fetch(`http://localhost:3000/jmods`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(jmods => {this.setState({jmods})}))
        .then(fetch(`http://localhost:3000/feed`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                old_feed: old_feed
              })
        })
        .then(res => res.json())
        .then(feed => {
            localStorage.setItem("new_feed",JSON.stringify(feed))}))
     : this.props.history.push("/") 
    }

    


    render() {
        return(
            <div>
                {this.props.jmod !== "" ?
                <Jmod jmod={this.props.jmod} /> : this.state.jmods ? this.state.jmods.map(jmod => {
                    return <React.Fragment> <button className="jmod" onClick={() => {this.props.activeMod(jmod)}}>{jmod.name}</button></React.Fragment>
                }) : null }
            </div>  
        )
    }
}

export default HomePage