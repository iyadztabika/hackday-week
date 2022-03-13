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

    return (
        <div>
            {listOfPosts.map((post, index) => (
                <div className='post' key={index} onClick={() => history.push(`/post/${post.id}`)}>
                <div className="title">{post.title}</div>
                <div className="content">{post.postText}</div>
                <div className="footer">{post.username}</div>
                </div>
            ))}
        </div>
    )
}

export default Home