import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const [listOfPosts, setListOfPosts] = useState([])

    const history = useHistory()

    useEffect(() => {
        axios
        .get('http://localhost:5000/posts')
        .then((res) => {
            setListOfPosts(res.data)
        })
        .catch(err => {
            console.log(err.response.status)
        })
    }, [])

    const likePost = (postId) => {
        axios
            .post(
                'http://localhost:5000/likes/', 
                { PostId: postId }, 
                { headers: { accessToken: localStorage.getItem('accessToken') } }
            )
            .then((res) => {
                alert(res.data)
            })
    }

    return (
        <div>
            {listOfPosts.map((post, index) => (
                <div className='post' key={index}>
                <div className="title">{post.title}</div>
                <div className="content" onClick={() => history.push(`/post/${post.id}`)}>{post.postText}</div>
                <div className="footer">
                    {post.username}
                    <button onClick={() => likePost(post.id)}>Like</button>
                </div>
                </div>
            ))}
        </div>
    )
}

export default Home