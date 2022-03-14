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

    return (
        <div className='postPage'>
            <div className="postPageLeft">
                <div className="postPageTitle">
                    {postData.title}
                </div>
                <div className="postPageText">
                    {postData.postText}
                </div>
                <div className="postPageFooter">
                    {postData.username}
                </div>
            </div>
            <div className="postPageRight">
                <div className='addCommentContainer'>
                    <input type="text" placeholder='Add Comment' value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    <button onClick={addComment}>Add Comment</button>
                </div>
                <div className='commentsList'>
                    {commentData?.map((comment, index) => (
                        <div className='comment' key={index}>
                            {comment.commentBody}
                            <label>Username: {comment.username}</label>
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