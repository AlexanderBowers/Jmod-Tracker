import React from 'react'
import PinComment from '../components/PinComment'

const PinCommentContainer = (props) => {

    return (
        <div className="container-fluid" style={{backgroundImage: `url(../rs3-background.jpg)`}}>
            <div className="row">
                    {props.comments.map(comment => {
                        return <PinComment comment={comment}/>
                    })}
            </div>
        </div>
    )
}

export default PinCommentContainer