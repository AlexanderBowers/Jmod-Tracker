import React from 'react'

    const PinComment = (props) => {

        function destroyComment  (e, comment)  {
            e.stopPropagation()
            let token = localStorage.getItem("token")
            fetch(`http://localhost:3000/comments/${comment.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            .then(res => res.json())
            .then(props.removeComment(comment))
        }
        
            return (
                <div className="card">
                    <p>{props.comment.body}</p>
                    <a href={`https://reddit.com${props.comment.permalink}`}>https://reddit.com{props.comment.permalink}</a>
                    <button className="trash" onClick={(e) => {destroyComment(e, props.comment)}}></button>
                </div>

            )
}
export default PinComment