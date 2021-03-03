import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Search from '../components/Search';
import Jmod from '../components/Jmod'

class HomePage extends Component {

   state = {
       jmod: this.props.jmod
   }

    componentDidMount() {
        let token = localStorage.getItem("token")
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
        })
    ) : this.props.history.push("/") 
    }


    render() {
        return(
            <div>
                {this.props.jmod != "" ?
                <Jmod jmod={this.props.jmod} /> : null}
            </div>
            
        )
    }

}

export default HomePage