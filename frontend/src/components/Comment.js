import React from 'react'

    const Comment = (props) => {

        function createComment  (comment, jmod)  {
            console.log('hit here')
            let token = localStorage.getItem("token")
            fetch('http://localhost:3000/comments', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body: JSON.stringify({
                    body: `${comment.data.body}`,
                    permalink: `${comment.data.permalink}`,
                    jmod: `${jmod}`    
                })
            })
            .then(res => console.log(res))
            .then(console.log())
        }
            return (
                <div className="card">
                    <p>{props.comment.data.body}</p>
                    <a href={`https://reddit.com${props.comment.data.permalink}`}>https://reddit.com{props.comment.data.permalink}</a>
                    <button className="pin" onClick={(e) => {createComment(props.comment, props.jmod)}}></button>
                </div>

            )
}
export default Comment