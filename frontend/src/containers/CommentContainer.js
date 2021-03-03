import React from 'react'
import Comment from '../components/Comment'

const CommentContainer = (props) => {

    return (<div>
        {props.comments.map (comment => {
            return <Comment comment={comment} />
        })}
    </div>)
}

export default CommentContainer