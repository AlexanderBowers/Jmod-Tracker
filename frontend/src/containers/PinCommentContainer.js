import React from 'react'
import PinComment from '../components/PinComment'

const PinCommentContainer = (props) => {

    return (
        <div className="comments">
            {props.comments.map(comment => {
                return <PinComment comment={comment} removeComment={props.removeComment}/>
            })}
        </div>
    
    )
}

export default PinCommentContainer