import React, {useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import { AuthContext } from '../helpers/AuthContext'

const Login = () => {
    let history = useHistory()

    const { setAuthState } = useContext(AuthContext)

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
                    localStorage.setItem('accessToken', res.data.token)
                    setAuthState({ username: res.data.username, id: res.data.id, status: true })
                    history.push('/')
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