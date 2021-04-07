import React, {Component} from 'react'
import Jmod from '../components/Jmod'

class FeedPage extends Component {

   state = {
       jmod: this.props.jmod,
       updates: "",
       follows: JSON.parse(localStorage.getItem('follows'))
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
            this.renderUpdates()
        }
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
        if (updates.length === 0){
            return <h4>There are no updates.</h4>
        }
        else {
                let new_updates = `There are updates in ${updates}`
                return <h4>{new_updates}</h4>
            
        }
        
    }

    renderJmods(){
        if (this.props.jmod !== "") {
            console.log("shouldn't be here")
            return <Jmod jmod={this.props.jmod} />
        }
        else if (this.state.follows && this.state.follows.length > 0) {
            this.state.follows.map(jmod => {
                console.log('am i here?')
                console.log(jmod)
                 return <React.Fragment><button className="jmod" onClick={() => {this.props.activeMod(jmod)}}>{jmod}</button></React.Fragment>
            })
        }
        else {
            console.log('why am i not here?')
            return <h4>You're not following any Jmods. Visit their page and press the follow button to receive updates here.</h4>
        }
    }

    render() {
        return(
            <div>
                <h5>{this.state.error ? this.state.error : null}</h5>
                {this.renderUpdates()}
                {this.props.jmod !== "" ?
            <Jmod jmod={this.props.jmod} /> : this.state.follows ? this.state.follows.map(jmod => {
                return <React.Fragment> <button className="jmod" onClick={() => {this.props.activeMod(jmod)}}>{jmod}</button></React.Fragment>
            }) : null }
            </div>  
        )
    }
}

export default FeedPage