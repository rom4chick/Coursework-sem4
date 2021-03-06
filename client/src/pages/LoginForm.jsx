import React, { useContext } from 'react';
import { Formik } from "formik";
import  * as Yup from "yup";
import Axios from 'axios';
import { Button, TextField, makeStyles } from '@material-ui/core';
import { Context } from '../index';

const useStyles = makeStyles((theme) => ({
  input: {
      lineHeight: '1.5em',
      margin: 'dense',
      padding: '4px 6px',
      display: 'block',
      width: '100%',
      boxSizing: 'border-box',
  },
  form: {
      display: 'block',
      fontFamily: 'Arial Helvetica, sans-serif',
      position: 'relative',
      padding: '0 24px 24px 24px',
      margin: 'auto',
  },
  error: {
      color: 'red',
      fontWeight: 700,
      fontSize: '13px',
  } 
}))

const getToken = async () => {
  return await Axios.get('http://localhost:3001/users/login').then((response => {
    this.setTypes(response.data)
    return response.data
  }))
}

const LoginForm = () => {
  const {user} = useContext(Context)
  const classes = useStyles();

  const submitLogin = async (values, user) => {
    const emailValue = values.email;
    const passwordValue = values.password;

    const token = Axios.get('http://localhost:3001/users/login', {
      email: values.email,
      password: values.password,
    })

    const userInfo = Axios.get(`http://localhost:3001/users/:${emailValue}`)

    // user.setLoginedUser(userInfo.name)

    console.log(userInfo)
    // console.log(token)
  }

  const validationSchema = Yup.object().shape({
      email: Yup.string().typeError('Should be a string').required('Necessarily'),
      password: Yup.string().typeError('Should be a string').required('Necessarily'),
  })

  return (
<div>
  <Formik
  initialValues={{
      name: '',
      password: '',
      confirmPassword: '',
      email: '',
  }}
  validateOnBlur
  onSubmit={values => submitLogin(values, user)}
  validationSchema={validationSchema}
  >
      {({values, errors, touched, handleChange, handleBlur, 
      isValid, handleSubmit, dirty}) => (<div className={classes.form}>
          <p>
            <TextField width="md" label="Email"
                fullWidth
                className={classes.input}
                type={`email`}
                name={`email`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
            />
          </p>
          {touched.email && errors.email && <p className={classes.error}>{errors.email}</p>}

          <p>
              <TextField label="Password"
                  className={classes.input}
                  type={`password`}
                  name={`password`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}

              />
          </p>
          {touched.password && errors.password && <p className={classes.error}>{errors.password}</p>}
          
       


          <Button
          disabled={!isValid && !dirty}
          onClick={handleSubmit}
          type={`submit`}
          >Submit
          </Button>
      </div>)}
  </Formik>
</div>

  )
}

export default LoginForm;