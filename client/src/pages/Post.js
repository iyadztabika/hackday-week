import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Post = () => {
    const { id } = useParams()

    useEffect(() => {
        
    }, [])

    return (
        <div>Post</div>
    )
}

export default Post