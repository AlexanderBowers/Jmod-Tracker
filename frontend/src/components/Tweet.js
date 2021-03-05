import React from 'react'

    const Tweet = (props) => {

       function createTweet  (tweet, jmod)  {
            let token = localStorage.getItem("token")
            fetch('http://localhost:3000/tweets', {
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
                    jmod_id: `${jmod.id}`    
                })
            })
            .then(res => res.json())
            .then(console.log())
        }

            return (
                <div className="col-sm-6">
                    <div className="card">
                        <p>{props.tweet.text}</p>
                        <a href={`https://twitter.com/${props.jmod.name}/status/${props.tweet.id} `}>{`https://twitter.com/${props.jmod.name}/status/${props.tweet.id}`}</a>
                        <button onClick={() => {createTweet(props.tweet, props.jmod)}}>pin</button>
                    </div>
                </div>
                 

            )
}
export default Tweet