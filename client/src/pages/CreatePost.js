import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { AuthContext } from '../helpers/AuthContext'

const CreatePost = () => {
    const history = useHistory()
    const { authState } = useContext(AuthContext)

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            history.push('/login')
        }
    }, [])

    const initialValues = {
        title: "",
        postText: ""
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required()
    })

    const onSubmit = (data) => {

        axios
        .post('http://localhost:5000/posts', data, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        })
        .then((res) => {
            history.push('/')
        })
        .catch((err) => {
            console.log(err.res.status)
        })
    }

    return (
        <div className='createPostPage'>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className='formContainer'>
                    <label>Title:</label>
                    <ErrorMessage name="title" component="span" />
                    <Field id="inputCreatePost" name="title" placeholder="Add Title" />
                    <label>Post:</label>
                    <ErrorMessage name="postText" component="span" />
                    <Field id="inputCreatePost" name="postText" placeholder="Add Post" />

                    <button type='submit'>Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost