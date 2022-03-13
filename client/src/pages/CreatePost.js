import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const CreatePost = () => {

    const initialValues = {
        title: "",
        postText: "",
        username: ""
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        username: Yup.string().required().min(3).max(15)
    })

    const onSubmit = (data) => {
        console.log(data)
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
                    <Field autocomplet="off" id="inputCreatePost" name="title" placeholder="Add Title" />
                    <label>Post:</label>
                    <Field autocomplet="off" id="inputCreatePost" name="post" placeholder="Add Post" />
                    <label>Username:</label>
                    <Field autocomplet="off" id="inputCreatePost" name="username" placeholder="Add Username" />

                    <button type='submit'>Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost