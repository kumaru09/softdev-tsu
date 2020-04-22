import React from 'react'

export const Post = ({ post }) => {
    <div className="card" style={{width: '20rem'}}>
        <div className="body">
            <h4 className="card-title">{post.title}</h4>
            <p className="card-text">{post.desciption}</p>
            <a href={post.link} className="card-link">Read more</a>
        </div>
    </div>
}
