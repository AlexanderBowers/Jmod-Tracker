import React from 'react'

    const PinTweet = (props) => {

        function destroyTweet  (e, tweet)  {
            e.stopPropagation()
            let token = localStorage.getItem("token")
            fetch(`https://jmod-tracker.herokuapp.com/tweets/${tweet.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            .then(res => res.json())
            .then(props.removeTweet(tweet))
            .then(console.log(tweet))
        }

            return (
                <div className="card">
                    <p>{props.tweet.text}</p>
                    
                    <a href={`https://twitter.com/${props.tweet.jmod_name}/status/${props.tweet.tweet_id} `}>{`https://twitter.com/${props.tweet.jmod_name}/status/${props.tweet.tweet_id}`}</a>
                    <button className="trash" onClick={(e) => {destroyTweet(e, props.tweet)}}></button>
                </div>
                

            )
}
export default PinTweet