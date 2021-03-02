import React from 'react'

    const Comment = (props) => {
            return (
                <div className="card" width="15%">
                    <p>{props.body}</p>
                    <a href={`https://reddit.com/${props.permalink} `}>{props.permalink}</a>
                </div>

            )
}
export default Comment