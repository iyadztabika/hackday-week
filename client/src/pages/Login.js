import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const Login = () => {

    const initialValues = {
        username: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required().min(3).max(15),
        password: Yup.string().required().min(4).max(20)
    })

    const onSubmit = (data) => {
        axios
            .post("http://localhost:5000/auth/login", data)
            .then((res) => {
                if (res.data.error) {
                    alert(res.data.error)
                } else {
                    sessionStorage.setItem('accessToken', res.data)
                }
            })
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className='formContainer'>
                    <label>Username:</label>
                    <ErrorMessage name="username" component="span" />
                    <Field autoComplete="off" id="inputCreatePost" name="username" placeholder="Your username" />

                    <label>Password:</label>
                    <ErrorMessage name="password" component="span" />
                    <Field autoComplete="off" type="password" id="inputCreatePost" name="password" placeholder="Your password" />

                    <button type='submit'>Login</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Login