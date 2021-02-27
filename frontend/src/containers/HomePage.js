import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Search from '../components/Search';

class HomePage extends Component {

    state = {
        playlists: [],
        videos: []
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
                <Container fluid>
                    <h1 align= "center"> Welcome {this.state.user}! </h1> 
                </Container>
                <Search />
            </div>
            
        )
    }

}

export default HomePage