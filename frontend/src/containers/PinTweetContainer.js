import React from 'react'
import PinTweet from '../components/PinTweet'

const PinTweetContainer = (props) => {


    return (
        <div className="tweets">
            {props.tweets.map(tweet => {
                return <PinTweet tweet={tweet} removeTweet={props.removeTweet}/>
            })}
        </div>

    )
}
export default PinTweetContainer