import React ,{Component} from 'react'
import PinCommentContainer from '../containers/PinCommentContainer'
import PinTweetContainer from '../containers/PinTweetContainer'

class Profile extends Component {

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
                tweets: data.tweets,
                comments: data.comments,
                user: data.user.username
            })
        })
    ) : this.props.history.push("/") 
    }

    removeTweet = (tweet) => {
        this.setState(prevState => ({
            tweets: prevState.tweets.filter(list => list !== tweet)
        }))
    }
    
    removeComment = (comment) => {
        this.setState(prevState => ({
            comments: prevState.comments.filter(list => list !== comment)
        }))
    }
     


    state = {
        active: ""
    }

    renderSwitch(state) {
        switch(state) {
            case "reddit":
                return <PinCommentContainer comments={this.state.comments} removeComment={this.removeComment}/>
            case "twitter":
                return <PinTweetContainer tweets={this.state.tweets} removeTweet={this.removeTweet}/>
            default:
                return ""
        }
    }
    handleTwitter  (e) {
        e.preventDefault()
            this.setState(prevState => ({
                active: "twitter"

            }))
    }

    handleReddit  (e) {
        e.preventDefault()
            this.setState(prevState => ({
                active: "reddit"
                
            }))
    }
    
     render(){
        return (
            <div className="Profile">
            <h1>Your Pins</h1>
            <button className="twitter" onClick={(e) => {this.handleTwitter(e)}}></button> <button className="reddit" onClick={(e) => {this.handleReddit(e)}}></button>
            {this.renderSwitch(this.state.active)}
            </div>
        )
        }
}

export default Profile