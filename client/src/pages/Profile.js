import React from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const { id } = useParams()

    return (
        <div className='profilePageContainer'>
            <div className="basicInfo">
                <h1>Username: </h1>
            </div>
            <div className="listOfPosts"></div>
        </div>
    )
}

export default Profile