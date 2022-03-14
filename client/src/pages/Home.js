import { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import {AuthContext} from '../helpers/AuthContext'

const Home = () => {
    const [listOfPosts, setListOfPosts] = useState([])
    const history = useHistory()
    const { authState } = useContext(AuthContext)

    useEffect(() => {

        if (!authState.status) {
            history.push('/login')
        } else {
            axios
            .get('http://localhost:5000/posts')
            .then((res) => {
                setListOfPosts(res.data)
            })
            .catch(err => {
                console.log(err.response.status)
            })
        }

    }, [])

    const likePost = (postId) => {
        axios
            .post(
                'http://localhost:5000/likes/', 
                { PostId: postId }, 
                { headers: { accessToken: localStorage.getItem('accessToken') } }
            )
            .then((res) => {
                setListOfPosts(listOfPosts.map(post => {
                    if (post.id === postId) {
                        if (res.data.liked) {
                            return {...post, Likes: [...post.Likes, 0] }
                        } else {
                            const likeArray = post.Likes
                            likeArray.pop()
                            return {...post, Likes: likeArray }
                        }
                    } else {
                        return post
                    }
                }))
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
                    <label>{post?.Likes?.length}</label>
                </div>
                </div>
            ))}
        </div>
    )
}

export default Home