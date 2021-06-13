import React, { Component } from 'react';

export default class Comments extends Component {
    render() {
        const comments = this.props.comments.length === 0 ? <p className="font-weight-bold p-2">No comments</p> : this.props.comments.map((comment, index) => {
            return <div className="d-flex align-items-center my-2" key={index}>
                <img className="my-auto" src={comment.photo_url} alt="avatar"></img>
                <div className="d-flex flex-column justify-content-around align-items-start">
                    <span>{comment.name}</span>
                    <p>{comment.comment}</p>
                </div>
            </div>
        });

        return (
            <div className="comments-form">
                {comments}
            </div>
        );
    }
}