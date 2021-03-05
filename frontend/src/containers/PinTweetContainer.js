import React from 'react'
import PinTweet from '../components/PinTweet'

const PinTweetContainer = (props) => {

    return (
        <div className="container-fluid">
            <div className="row">
                    {props.tweets.map(tweet => {
                        return <PinTweet tweet={tweet}/>
                    })}
            </div>
        </div>

    )
}
export default PinTweetContainer