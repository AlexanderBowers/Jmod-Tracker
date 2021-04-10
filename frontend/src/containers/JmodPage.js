import React, {Component} from 'react'
import Jmod from '../components/Jmod'

class JmodPage extends Component {

   state = {
       jmod: this.props.jmod,
       updates: ""
   }

    componentDidMount() {
        let token = localStorage.getItem("token")
         token ? 
        fetch(`http://localhost:3000/jmods`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(jmods => {this.setState({jmods})})
     : this.props.history.push("/") 
    }

    render() {
        return(
            <div>
                <p className="jmodList">Jagex Ash: Content developer for OSRS<br></br>
                    Jagex Ramen: Content developer for RS3<br></br>
                    Jagex Pi: Senior Gameplay Programmer and Combat Curator for RS3<br></br>
                    Jagex Shogun: Ninja Team content developer for RS3<br></br>
                    Jagex Kari: Community Manager for RS3
                </p>
                {this.props.jmod !== "" ?
                <Jmod jmod={this.props.jmod} /> : this.state.jmods ?
                 this.state.jmods.map(jmod => {
                    return <React.Fragment> <button className="jmod" onClick={() => {this.props.activeMod(jmod)}}>{jmod}</button></React.Fragment>
                }) : null }
            </div>  
        )
    }
}

export default JmodPage