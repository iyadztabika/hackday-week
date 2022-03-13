import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Post = () => {
    const [postData, setPostData] = useState({})
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
                Comment Section
            </div>
        </div>
    )
}

export default Post