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
        <div>
            {postData.username}
        </div>
    )
}

export default Post