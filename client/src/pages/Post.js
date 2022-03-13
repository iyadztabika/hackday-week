import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Post = () => {
    const [postData, setPostData] = useState({})
    const [commentData, setCommentData] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`http://localhost:5000/posts/single/${id}`)
            .then(res => {
                setPostData(res.data)
            })
            .catch(err => {
                console.log(err.response.status)
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
                    <input type="text" placeholder='Add Comment' />
                    <button>Add Comment</button>
                </div>
                <div className='commentsList'>
                    {commentData.map((comment, index) => (
                        <div className='comment' key={index}>
                            {comment.commentBody}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Post