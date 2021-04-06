import React from 'react'
import CommentContainer from '../containers/CommentContainer'
import TweetContainer from '../containers/TweetContainer'


class Jmod extends React.Component {

    state = {
        active: ""
    }
    //when reddit ser doesn't exist, return is:
    //{errors:{detail: "blah blah blah"}}
    //to iterate over reddit response
    //response comes out as
    //{data: {children: [{data: {body: text, permalink: text}}, {}, {}]}}
    //to generate link to comment:
    //https://reddit.com/${permalink}
    //if user isn't found, response is {message: "Not Found"}
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
            if(res.data && res.data.children.length > 0) {
                this.setState({
                    comments: res.data.children,
                    active: "reddit",
                    error: ""
                })
            }   
            else{
                this.setState({
                    error: "This person does not comment on Reddit"
                })
            } 
        })
    }
     
    //to iterate over twitter response
    //response comes out as
    //{data: [{"text": "blah blah", "id": "number_string"}]} 10 objects return inside the array.
    //to generate link to tweet:
    //https://twitter.com/${username}/status/${id}
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
                    tweets: tweets.data,
                    error: ""
                })
            }
            else {
                this.setState({
                    error: "This person does not visit Twitter"
                })
            }
        })
    }

    //switches between displaying reddit and twitter info
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

    //handleFollow allows a user to click a button to follow/unfollow a Jmod by adding/removing jmod's name to local storage
    handleFollow(e) {
        let follows = localStorage.getItem('follows')
        if (follows){      
         } 
         else {
             localStorage.setItem('follows', '')
              follows = localStorage.getItem('follows')
         }  
            if (follows.length > 0) {
                follows = JSON.parse(follows)
                
                if (follows.find(jmod => jmod['name']===`${this.props.jmod['name']}`)){ 
                    //remove the index of follows where jmod's name is located, stringify, then set to local storage
                    let index = follows.findIndex(jmod => jmod.name===`${this.props.jmod.name}`)
                    follows.splice(index, 1)
                    localStorage.setItem('follows', JSON.stringify(follows))
                    this.setState(prevState => ({
                        error: `No longer following ${this.props.jmod.name}`
                    }))
                }
                else {     
                     follows.push(this.props.jmod)
                     localStorage.setItem('follows', JSON.stringify(follows))
                     this.setState(prevState => ({
                        error: `Now following ${this.props.jmod.name}`
                    }))

                }
            }
            else {
                follows = [`${this.props.jmod}`]
                    localStorage.setItem('follows', JSON.stringify(follows))
                    this.setState(prevState => ({
                        error: `Now following ${this.props.jmod.name}`
                    }))
            }
    }

    render(){
    return (
        
        <div className="JmodPage">
            <h5>{this.state.error ? this.state.error : null}</h5>
        <h1>{this.props.jmod.name}</h1>
        <button className="follow" onClick={(e) => {this.handleFollow(e)}}></button>
        <button className="twitter" onClick={(e) => {this.handleTwitter(e)}}></button> <button className="reddit" onClick={(e) => {this.handleReddit(e)}}></button>
        {this.renderSwitch(this.state.active)}
        </div>
    )
    }
}
export default Jmod