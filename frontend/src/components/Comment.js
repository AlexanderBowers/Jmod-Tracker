import React from 'react'

    const Comment = (props) => {
            return (
                <div className="card" width="15%">
                    <p>{props.comment.data.body}</p>
                    <a href={`https://reddit.com/${props.comment.data.permalink} `}>{props.comment.data.permalink}</a>
                </div>

            )
}
export default Comment