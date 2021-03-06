import React from 'react'

    const PinComment = (props) => {

        
            return (
                <div className="col-sm-6">
                    <div className="card">
                        <p>{props.comment.body}</p>
                        <a href={`https://reddit.com/${props.comment.permalink}`}>https://reddit.com/{props.comment.permalink}</a>
                        <button>delete</button>
                    </div>
                </div>

            )
}
export default PinComment