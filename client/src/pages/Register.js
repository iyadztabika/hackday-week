import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Register = () => {
    const history = useHistory()

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
            .post("http://localhost:5000/auth", data)
            .then((res) => {
                history.push('/')
            })
            .catch(err => {
                console.log(err)
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
                    <Field autoComplete="off" className="input" id="inputRegUsername" name="username" placeholder="Your username" />

                    <label>Password:</label>
                    <ErrorMessage name="password" component="span" />
                    <Field autoComplete="off" className="input" type="password" id="inputRegPassword" name="password" placeholder="Your password" />

                    <button type='submit'>Register</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Register