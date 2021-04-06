import React, {Component} from 'react'
import Jmod from '../components/Jmod'

class FeedPage extends Component {

   state = {
       jmod: this.props.jmod,
       updates: ""
   }

    componentDidMount() {
        let token = localStorage.getItem("token")
        let feed = localStorage.getItem("feed")
        let follows = localStorage.getItem("follows")
        console.log('test')
        if (follows === null) {
            follows = []
        }
        if (feed === null) {
            localStorage.setItem("feed", JSON.stringify({jagexFiller: {twitter: [], reddit: []}})) 
        }
        if (token) {
            if (follows.length > 2) {
                fetch(`http://localhost:3000/feed`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                      "Content-Type" : "application/json",
                      "Accept" : "application/json"
                    },
                    body: JSON.stringify({
                      jmods: `${follows}`,
                      old_feed: `${feed}` 
                    })
            })
            .then(res => res.json())
            .then(jmods => {
                this.getFeed(token, feed)
            })

            }
            else {
                console.log('3')
                this.setState(prevState => ({
                    error: 'Follow a Jmod to see updates here by clicking on their page.'
                }))
            }
            
     } 
     else {
        this.props.history.push("/") 
     }
    }

    getFeed(token, feed) {
        fetch(`http://localhost:3000/feed`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                feed: feed
            })
        })
        .then(res => res.json())
        .then(feed => {
            localStorage.setItem("new_feed",JSON.stringify(feed))
            this.checkUpdates()}
        )
    }

    checkUpdates() {
        let feed = localStorage.getItem('feed')
        let new_feed = localStorage.getItem('new_feed')
        let old_json = JSON.parse(feed)
        let new_json = JSON.parse(new_feed)
        let updates = ""
        Object.keys(new_json).forEach(function (j) {
            if (old_json[j]) {
               if (old_json[j]["twitter"] !== new_json[j]["twitter"] && old_json[j]["reddit"] !== new_json[j]["reddit"] && new_json[j]["reddit"].length > 0) {
                   updates  +=( `${j}'s twitter and reddit, `)
               }
               else if(old_json[j]["twitter"] !== new_json[j]["twitter"]) {
                   updates  +=(`${j}'s twitter, `)
               }
               else if(old_json[j]["reddit"] !== new_json[j]["reddit"] && new_json[j]["reddit"].length !== 0) {
                    updates  +=(`${j}'s reddit, `)
               }
               else if (old_json[j]["reddit"] !== new_json[j]["reddit"] && new_json[j]["reddit"].length === 0) {
                    updates += ""
                }
            }
            else {
                    updates  +=(`${j}'s twitter and reddit, `)
            }
        })
        localStorage.setItem('updates', updates)
        localStorage.setItem('feed', new_feed)
        localStorage.removeItem('new_feed')
    }

    renderUpdates() {        
        let updates = localStorage.getItem('updates')
        if (updates){
            if (updates.length === 0){
                return (
                    <div className='updates'>
                        <h4>There are no new updates.</h4>
                    </div>
                )
            }
            else {
                return (
                    <div className='updates'>
                        <h4>{`There are updates in ${updates}`}</h4>
                    </div>
                )
            }
        }
    }

    render() {
        return(
            <div>
                <h5>{this.state.error ? this.state.error : null}</h5>
                {this.renderUpdates()}
                {this.props.jmod !== "" ?
                <Jmod jmod={this.props.jmod} /> :  localStorage.getItem('follows') && localStorage.getItem('follows').length > 2 ? JSON.parse(localStorage.getItem('follows')).map(jmod => {
                    return <React.Fragment> <button className="jmod" onClick={() => {this.props.activeMod(jmod)}}>{jmod.name}</button></React.Fragment>
                }) : null }
            </div>  
        )
    }
}

export default FeedPage