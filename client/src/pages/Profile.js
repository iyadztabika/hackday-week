import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const [username, setUsername] = useState('')
    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`http://localhost:5000/auth/profileInfo/${id}`)
            .then(res => {
                setUsername(res.data.username)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className='profilePageContainer'>
            <div className="basicInfo">
                <h1>Username: {username}</h1>
            </div>
        </div>
    )
}

export default Profile