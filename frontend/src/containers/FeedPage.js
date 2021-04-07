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
        let jmods = localStorage.getItem('follows')
        if (feed === null) {
            localStorage.setItem("feed", JSON.stringify({jagexFiller: {twitter: [], reddit: []}})) 
        }
         if (token) {
            this.getFeed(token, jmods)
         }
          
     else { 
         this.props.history.push("/")
     } 
    }

    getFeed(token, jmods) {
        fetch(`http://localhost:3000/feed`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                jmods: jmods
            })
        })
        .then(res => res.json())
        .then(feed => {
            feed = JSON.stringify(feed)
            localStorage.setItem("new_feed",feed)
            this.checkUpdates()
        }
        )
    }

    checkUpdates() {
        let feed = localStorage.getItem('feed')
        console.log(`feed is ${feed}`)
        let new_feed = localStorage.getItem('new_feed')
        console.log(`new_feed is ${new_feed}`)
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
        console.log(`new_feed is ${new_feed}`)
        console.log(`new_json is ${new_json}`)
        console.log(`stringifed, new_)`)
        localStorage.setItem('feed', new_feed)
        localStorage.removeItem('new_feed')
    }

    renderUpdates() {        
        let updates = localStorage.getItem('updates')
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

    renderJmods(){
        if (this.props.jmod !== "") {
            console.log("shouldn't be here")
            return <Jmod jmod={this.props.jmod} />
        }
        else if (this.props.follows && this.props.follows.length > 0) {
            this.props.follows.map(jmod => {
                console.log('am i here?')
                console.log(jmod)
                 return <button className="jmod" onClick={() => {this.props.activeMod(jmod)}}>{jmod}</button>
            })
        }
        else {
            console.log('why am i not here?')
            return <h4>You're not following any Jmods. Visit their page and press the follow button to receive updates here.</h4>
        }
    }

    render() {
        return(
            <div>{this.get}
                {this.renderJmods()}
            </div>  
        )
    }
}

export default FeedPage