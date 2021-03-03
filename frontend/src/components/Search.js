import React from 'react'
import Form from 'react-bootstrap/Form'



export default class Search extends React.Component {
    state = {
        query: "",
        reddit: "",
        id: 0,
        comments: [],
        tweets: [],
        jmod: ""
    }
    

   

    

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