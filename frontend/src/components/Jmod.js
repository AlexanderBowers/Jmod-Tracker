import React from 'react'
import CommentContainer from '../containers/CommentContainer'
import TweetContainer from '../containers/TweetContainer'


class Jmod extends React.Component {

    state = {
        active: ""
    }

    handleReddit (e) {
        e.preventDefault()
        let token = localStorage.getItem("token")
        fetch('http://localhost:3000/reddit', {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
              name: `${this.props.jmod.name}`
            })

        })
        .then(res => res.json())
        .then(res => {
            if(res.data) {
                this.setState({
                    comments: res.data.children,
                    active: "reddit"
                })
            }   
            else{
                this.setState({
                    error: "This person does not visit Reddit"
                })
            } 
        })
    }

     handleTwitter  (e)  {
        e.preventDefault()
        let token = localStorage.getItem("token")
        fetch('http://localhost:3000/search', {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
              name: `${this.props.jmod.name}`
            })

        })
        .then(res => res.json())
        .then(tweets => {
            if (tweets.data) {
                this.setState({
                    active: "twitter",
                    tweets: tweets.data
                })
            }
            else {
                this.setState({
                    error: "This person does not visit Twitter"
                })
            }
        })
    }
    //to iterate over twitter response
    //response comes out as
    //{data: [{"text": "blah blah", "id": "number_string"}]} 10 objects return inside the array.
    //to generate link to tweet:
    //https://twitter.com/${username}/status/${id}


    //when user doesn't exist, return is:
    //{errors:{detail: "blah blah blah"}}
    //to iterate over reddit response
    //response comes out as
    //{data: {children: [{data: {body: text, permalink: text}}, {}, {}]}}
    //to generate link to comment:
    //https://reddit.com/${permalink}
    //if user isn't found, response is {message: "Not Found"}

    renderSwitch(state) {
        switch(state) {
            case "reddit":
                return <CommentContainer comments={this.state.comments} jmod={this.props.jmod}/>
            case "twitter":
                return <TweetContainer tweets={this.state.tweets} jmod={this.props.jmod}/>
            default:
                return ""
        }
    }

    render(){
    return (
        <div>
            <h5>{this.state.error ? this.state.error : null}</h5>
        <h1>{this.props.jmod.name}</h1>
        <button className="btn btn-primary" onClick={(e) => {this.handleTwitter(e)}}>Twitter</button> <button className="btn btn-primary" onClick={(e) => {this.handleReddit(e)}}>Reddit</button>
        {this.renderSwitch(this.state.active)}
        </div>
    )
    }
}
export default Jmod