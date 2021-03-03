import React from 'react'

    const Tweet = (props) => {
            return (
                <div className="card" width="15%">
                    <p>{props.tweet.text}</p>
                    <a href={`https://twitter.com/${props.jmod}/status/${props.tweet.id} `}>{`https://twitter.com/${props.jmod}/status/${props.tweet.id}`}</a>
                </div>

            )
}
export default Tweet