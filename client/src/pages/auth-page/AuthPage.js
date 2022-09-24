import React, { useContext, useEffect, useState } from 'react'
import SignInForm from '../../components/sign-in-form'
import SignUpForm from '../../components/sign-up-form'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'
import './authpage.css'

export const AuthPage = () => {
  const auth = useContext(AuthContext)

  const message = useMessage()

  const { loading, request, error, clearError } = useHttp()

  const [authType, setAuthType] = useState('sign-up')
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className="auth-area">
      <div className="auth-tabs">
        <span
          className={`auth-tab${authType === 'sign-in' ? ' is-selected' : ''}`}
          onClick={() => setAuthType("sign-in")}
        >
          Sign In
        </span>
        <span
          className={`auth-tab${authType === 'sign-up' ? ' is-selected' : ''}`}
          onClick={() => setAuthType("sign-up")}
        >
          Sign Up
        </span>
      </div>
      {
        authType === 'sign-up' ?
          <SignUpForm
            registerHandler={registerHandler}
            changeHandler={changeHandler}
            loading={loading}
          /> :
          <SignInForm
            loginHandler={loginHandler}
            changeHandler={changeHandler}
            loading={loading}
          />
      }
    </div>
  )
}