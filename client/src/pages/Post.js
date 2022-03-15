import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import {AuthContext} from '../helpers/AuthContext'

const Post = () => {
    const [postData, setPostData] = useState({})
    const [commentData, setCommentData] = useState([])
    const [newComment, setNewComment] = useState("")
    const { id } = useParams()
    const { authState } = useContext(AuthContext)

    useEffect(() => {
        axios
            .get(`http://localhost:5000/posts/single/${id}`)
            .then(res => {
                setPostData(res.data)
            })
            .catch(err => {
                console.log(err)
            })

        axios
            .get(`http://localhost:5000/comments/${id}`)
            .then(res => {
                setCommentData(res.data)
            })
            .catch(err => {
                console.log(err.response.status)
            })
    }, [id])

    const addComment = () => {
        axios
            .post(`http://localhost:5000/comments`, {
                commentBody: newComment, 
                PostId: id
            },{ headers: {accessToken:localStorage.getItem("accessToken")}})
            .then((res) => {
                if (res.data.error) {
                    alert(res.data.error)
                } else {
                    const commentToAdd = { commentBody: newComment, username: res.data.username }
                    setCommentData([...commentData, commentToAdd])
                    setNewComment("")
                }
            })
            .catch(err => console.log(err.response.status))
    }

    const deleteComment = (id) => {
        axios
            .delete(`http://localhost:5000/comments/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") }
            })
            .then((res) => {
                if (res.data.error) {
                    alert(res.data.error)
                } else {
                    setCommentData(commentData.filter(comment => {
                        return comment.id !== id
                    }))
                }
            })
            .catch((err) => {
                console.log(err.response.status)
            })
    }

    const editPost = (option) => {
        if (option === 'title') {
            let newTitle = prompt('Enter new title: ')
            axios
                .put('http://localhost:5000/posts/title', {
                    newTitle, id
                }, {
                    headers: {accessToken:localStorage.getItem("accessToken")}
                })
            
            // for ui
            setPostData({...postData, title: newTitle})
        } else {
            let newPostText = prompt('Enter new text: ')
            axios
                .put('http://localhost:5000/posts/postText', {
                    newPostText, id
                }, {
                    headers: {accessToken:localStorage.getItem("accessToken")}
                })
            
            // for ui
            setPostData({...postData, postText: newPostText})
        }
    }

    return (
        <div className='postPage'>
            <div className="leftSide">
                <div className="post" id='individual'>
                    <div className="title" onClick={() => {
                        if (authState.username === postData.username) {
                            editPost('title')
                        }
                    }}>
                        {postData.title}
                    </div>
                    <div className="body" onClick={() => {
                        if (authState.username === postData.username) {
                            editPost('body')
                        }
                    }}>
                        {postData.postText}
                    </div>
                    <div className="footer">
                        {postData.username}
                    </div>
                </div>
            </div>
            <div className="rightSide">
                <div className='addCommentContainer'>
                    <input type="text" placeholder='Add Comment' value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    <button onClick={addComment}>Add Comment</button>
                </div>
                <div className='listOfComments'>
                    {commentData?.map((comment, index) => (
                        <div className='comment' key={index}>
                            <div>
                                <p>{comment.commentBody}</p>
                                <label>Username: {comment.username}</label>
                            </div>
                            {authState.username === comment.username && (
                                <button onClick={() => deleteComment(comment.id)}>x</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Post