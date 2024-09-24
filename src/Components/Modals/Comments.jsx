import React, { useState } from 'react'
import { PiXLight } from 'react-icons/pi'
import './modals.css'

const Comments = ({ open, closeShowCommentsModal, comments }) => {
  return (
    <div className={`modal ${open ? 'modal-open' : ''}`}>
      <div className='show-comments-modal'>
        <div
          className='close-modal'
          onClick={() => closeShowCommentsModal(!open)}
        >
          <PiXLight size={30} />
        </div>
        <h1>
          Comments <span>{comments.length !== 0 ? comments.length : ''}</span>
        </h1>
        <div className='comments-container'>
          {comments.length !== 0 ? (
            comments.map((comment, id) => (
              <div className='comment' key={id}>
                <p className='comment-text'> {comment.comment}</p>
                <p className='comment-owner'>
                  {comment.owner.full_name}{' '}
                  <span>{'( ' + comment.owner.username + ' )'} </span>
                </p>
                <div className='comment-timestamp'>
                  {new Date(comment.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))
          ) : (
            <div className='no-data-found'>
              <p>No comments</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comments
