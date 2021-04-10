import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
//import FormFile from 'react-bootstrap/FormFile'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'


class Login extends Component {




    render() {
        return(
            <div className="Login-container">
                <h5>Welcome to Jmod Tracker!<br></br>This website is still in development and is not endorsed by or affiliated with Jagex.<br></br>
                    <br></br>DO NOT use your RuneScape password for this site.
                </h5>
                <Container>
                    <Form className="Login-item">
                        <Form.Label> Login</Form.Label>
                        <Form.Group >
                            <Form.Label>Username</Form.Label>
                            <Form.Control name="username" placeholder="Enter username" onChange={(e) => this.props.handleLoginChange(e)}/>
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" onChange={(e) => this.props.handleLoginChange(e)}/>
                        </Form.Group>
                        <div className="buttons">
                            <Button variant="primary" type="button" className="signin" onClick={(e) => this.props.handleLoginSubmit(e)}>
                            </Button>
                            <Button variant="success" type="button" className="signup" onClick={(e) => this.props.toggleLogin(e)}>
                            </Button>
                        </div>
                    </Form>
                    </Container>
                
            </div>
        )
    }
}

export default Login