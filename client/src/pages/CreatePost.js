import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const CreatePost = () => {

    const initialValues = {
        title: "",
        postText: "",
        username: ""
    }

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className='createPostPage'>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
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