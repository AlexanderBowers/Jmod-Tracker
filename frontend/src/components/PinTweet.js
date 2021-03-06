import React from 'react'

    const PinTweet = (props) => {


            return (
                <div className="col-sm-6">
                    <div className="card">
                        <p>{props.tweet.text}</p>
                        <a href={`https://twitter.com/${props.tweet.jmod_name}/status/${props.tweet.tweet_id} `}>{`https://twitter.com/${props.tweet.jmod_name}/status/${props.tweet.tweet_id}`}</a>
                        <button>delete</button>
                    </div>
                </div>
                 

            )
}
export default PinTweet