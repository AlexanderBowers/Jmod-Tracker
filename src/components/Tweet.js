import React from 'react'

    const Tweet = (props) => {

       function createTweet  (tweet, jmod)  {
            let token = localStorage.getItem("token")
            fetch('https://jmod-tracker.herokuapp.com/tweets', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body: JSON.stringify({
                    text: `${tweet.text}`,
                    tweet_id: `${tweet.id}`,
                    jmod_name: `${jmod.name}`,
                    jmod: `${jmod}`    
                })
            })
            .then(res => res.json())
            .then(console.log())
        }

            return (
                    <div className="card">
                        <p>{props.tweet.text}</p>
                        <a href={`https://twitter.com/${props.jmod}/status/${props.tweet.id} `}>{`https://twitter.com/${props.jmod}/status/${props.tweet.id}`}</a>
                        <button className="pin" onClick={() => {createTweet(props.tweet, props.jmod)}}></button>
                    </div>
                 

            )
}
export default Tweet