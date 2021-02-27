import React from 'react'
import Form from 'react-bootstrap/Form'


export default class Search extends React.Component {
    state = {
        query: "",
        id: 0
    }
    handleChange = (e) => {
        let query =  e.target.value
        this.setState({query})
      }

    handleSubmit = (e) => {
        e.preventDefault()
        let token = localStorage.getItem("token")
        console.log(`sending fetch for ${this.state.query}`)
        fetch('http://localhost:3000/search', {
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
        .then(res => res.text())
        .then(console.log)
    }

    render(){
        return (
            <div>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Control type="text" placeholder="Search" onChange={this.handleChange}/>
                </Form.Group>
            </Form>
            <p>{this.state.query}</p>
            </div>
        )
    }
}