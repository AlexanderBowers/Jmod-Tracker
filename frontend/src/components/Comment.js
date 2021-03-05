import React from 'react'

    const Comment = (props) => {

        function createComment  (comment, jmod)  {
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
                    jmod_id: `${jmod.id}`    
                })
            })
            .then(res => res.json())
            .then(console.log())
        }
            return (
                <div className="card" width="15%">
                    <p>{props.comment.data.body}</p>
                    <a href={`https://reddit.com/${props.comment.data.permalink}`}>https://reddit.com/{props.comment.data.permalink}</a>
                    <button onClick={() => {createComment(props.comment, props.jmod)}} width="15px">pin</button>
                </div>

            )
}
export default Comment