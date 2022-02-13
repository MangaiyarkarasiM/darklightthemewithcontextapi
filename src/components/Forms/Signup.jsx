import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { GlobalContext } from '../../context/globalContext';

const signupValidationSchema = Yup.object().shape({
  email: Yup.string().email('Enter valid email!').required('Email is required!'),
  password: Yup.string().matches(/[a-zA-Z0-9]/, 'Password should contain only alphabets and numbers.').min(6, 'Password should be 6 chars or more.').required('Enter password'),
  confirm_password: Yup.string().min(6).required('Enter confirm password')
})

const Signup = () => {
  let {dark} = useContext(GlobalContext);
  const onSignup = (v) => {
    console.log('Signup Form > ', v)
  }
  return (
    <div className='px-10 py-4'>
      <Formik
        initialValues={{}}
        onSubmit={onSignup}
        validationSchema={signupValidationSchema}
      >
        {
          () => {
            return (
              <Form className='w-3/5'>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2' style={ dark?{ color: "white"}:null}>Email</label>
                  <Field
                    name="email"
                    type="email"
                    className='shadow appearance-none border rounded py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                  <ErrorMessage name='email' render={msg => <small className='text-red-600'>{msg}</small>} />
                </div>
                <div>
                  <label className='block text-gray-700 text-sm font-bold mb-2' style={ dark?{ color: "white"}:null}>Passord</label>
                  <Field
                    name="password"
                    type="password"
                    className='shadow appearance-none border rounded py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                  <ErrorMessage name='password' render={msg => <small className='text-red-600'>{msg}</small>} />
                </div>
                <div>
                  <label className='block text-gray-700 text-sm font-bold mb-2 mt-2' style={ dark?{ color: "white"}:null}>Confirm Passord</label>
                  <Field
                    name="confirm_password"
                    type="password"
                    className='shadow appearance-none border rounded py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                  <ErrorMessage name='confirm_password' render={msg => <small className='text-red-600'>{msg}</small>} />
                </div>
                <button type='submit' className='mt-4 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Sign up</button>
              </Form>
            )
          }
        }
      </Formik>

    </div>
  )
}

export default Signup;
