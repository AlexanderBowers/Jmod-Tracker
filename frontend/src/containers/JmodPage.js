import React, {Component} from 'react'
import Jmod from '../components/Jmod'

class HomePage extends Component {

   state = {
       jmod: this.props.jmod,
       updates: ""
   }

    componentDidMount() {
        let token = localStorage.getItem("token")
        let feed = localStorage.getItem("feed")
        if (feed === null) {
            localStorage.setItem("feed", JSON.stringify({jagexFiller: {twitter: [], reddit: []}})) 
        }
         token ? 
       
        fetch(`http://localhost:3000/jmods`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(jmods => {this.setState({jmods})})
        .then(fetch(`http://localhost:3000/feed`, {
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
            this.checkUpdates()}))
     : this.props.history.push("/") 
    }

    checkUpdates() {
        let feed = localStorage.getItem('feed')
        let new_feed = localStorage.getItem('new_feed')
        let old_json = JSON.parse(feed)
        let new_json = JSON.parse(new_feed)
        let updates = ""
        Object.keys(new_json).forEach(function (j) {
            if (old_json[j]) {
               if (old_json[j]["twitter"] !== new_json[j]["twitter"] && old_json[j]["reddit"] !== new_json[j]["reddit"]) {
                   updates  +=( `${j}'s twitter and reddit, `)
                    // let update = `${j}'s twitter and reddit`
                    // this.setState(prevState => ({       
                    //     updates: {
                    //         ...prevState.updates, update
                    //     }
                    // }))     
               }
               else if(old_json[j]["twitter"] !== new_json[j]["twitter"]) {
                   updates  +=(`${j}s twitter, `)
                // let update = `${j}s twitter`
                // this.setState(prevState => ({       
                //     updates: {
                //         ...prevState.updates, update
                //     }
                // }))     
               }
               else if(old_json[j]["reddit"] !== new_json[j]["reddit"] && new_json[j]["reddit"].length !== 0) {
                    updates  +=(`${j}s reddit, `)
                // let update = `${j}s reddit`
                // this.setState(prevState => ({       
                //     updates: {
                //         ...prevState.updates, update
                //     }
                // }))     
               }
            }
            else{
                    updates  +=(`${j}'s twitter and reddit, `)
                // let update = `${j}'s twitter and reddit`
                // this.setState(prevState => ({       
                //     updates: {
                //         ...prevState.updates, update
                //     }
                // }))  
            }
        })
        localStorage.setItem('updates', updates)
        localStorage.setItem('feed', new_feed)
        localStorage.removeItem('new_feed')
    }

    render() {
        return(
            <div>
                {this.props.jmod !== "" ?
                <Jmod jmod={this.props.jmod} /> : this.state.jmods ? this.state.jmods.map(jmod => {
                    return <React.Fragment> <button className="jmod" onClick={() => {this.props.activeMod(jmod)}}>{jmod.name}</button></React.Fragment>
                }) : null }
            </div>  
        )
    }
}

export default HomePage

 //  (
        // fetch(`http://localhost:3000/api/v1/profile`,{
        //     method: "GET",
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // })
        // .then(res => res.json())
        // .then(data => {
        //     this.setState({
        //         user: data.user.username
        //     })
        // }))