import React from 'react'

    const Tweet = (props) => {
            return (
                <div className="card" width="15%">
                    <p>{props.text}</p>
                    <a href={`https://twitter.com/${props.jmod}/${props.tweet_id}} `}>{props.permalink}</a>
                </div>

            )
}
export default Tweet