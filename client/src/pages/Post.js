import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Post = () => {
    const [postData, setPostData] = useState({})
    const [commentData, setCommentData] = useState([])
    const [newComment, setNewComment] = useState("")
    const { id } = useParams()

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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Post