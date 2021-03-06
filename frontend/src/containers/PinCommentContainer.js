import React from 'react'
import PinComment from '../components/PinComment'

const PinCommentContainer = (props) => {

    return (
        <div className="container-fluid">
            <div className="row">
                    {props.comments.map(comment => {
                        return <PinComment comment={comment}/>
                    })}
            </div>
        </div>
    )
}

export default PinCommentContainer