import React from 'react'
import Tweet from '../components/Tweet'

const TweetContainer = (props) => {

    return (
        <div className="tweets">
            {props.tweets.map(tweet => {
                return <Tweet tweet={tweet} jmod={props.jmod}/>
            })}
        </div>

    )
}
export default TweetContainer