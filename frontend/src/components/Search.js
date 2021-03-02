import React from 'react'
import Form from 'react-bootstrap/Form'
import Comment from './Comment'


export default class Search extends React.Component {
    state = {
        query: "",
        reddit: "",
        id: 0,
        comments: [],
        tweets: [],
        jmod: ""
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
        .then(res => res.json())
        .then(console.log)
    }
    //to iterate over twitter response
    //response comes out as
    //{data: [{"text": "blah blah", "id": "number_string"}]} 10 objects return inside the array.
    //to generate link to tweet:
    //https://twitter.com/${username}/status/${id}


    //when user doesn't exist, return is:
    //{errors:{detail: "blah blah blah"}}

    handleReddit = (e) => {
        e.preventDefault()
        let token = localStorage.getItem("token")
        console.log(`sending reddit request for ${this.state.query}`)
        fetch('http://localhost:3000/reddit', {
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
        .then(res => this.setState({
             comments: res.data.children
        }
        ))
    }
    //to iterate over reddit response
    //response comes out as
    //{data: {children: [{data: {body: text, permalink: text}}, {}, {}]}}
    //to generate link to comment:
    //https://reddit.com/${permalink}
    //if user isn't found, response is {message: "Not Found"}

    render(){
        return (
            <Form onSubmit={this.props.searchMod}>
                
                <Form.Group>
                    <Form.Control type="text" placeholder="Search Jmod" onChange={this.props.handleChange}/>
                </Form.Group>
            </Form>
        )
    }
}

// <div>
            //     Twitter Search
            // <Form onSubmit={this.handleSubmit}>
            //     <Form.Group>
            //         <Form.Control type="text" placeholder="Search" onChange={this.handleChange}/>
            //     </Form.Group>
            // </Form>

            // <br></br>
            //     Reddit Search
            //     <Form onSubmit={this.handleReddit}>
            //         <Form.Group>
            //             <Form.Control type="text" placeholder="Search" onChange={this.handleChange}/>
            //         </Form.Group>
            //     </Form>
            // <p>{this.state.query}</p>
            // <div>
               
            //     { this.state.comments.length > 0 ? this.state.comments.map(comment => {
            //          return <Comment body={comment.data.body} permalink={comment.data.permalink}/>
            //     }) : null}
            // </div>
            // </div>