import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const CreatePost = () => {
    return (
        <div className='createPostPage'>
            <Formik >
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