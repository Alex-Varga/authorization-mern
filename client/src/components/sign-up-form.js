import React from "react";

const SignUpForm = ({ changeHandler, loading, registerHandler }) => {
  return (
    <form className="card white" onSubmit={registerHandler}>
    <div className="card-content white-text">
      <span className="card-title">Sign in</span>
      <div>

        <div className="input-field">
          <input 
            id="email" 
            name='email'
            placeholder='Enter email'
            type="text"
            required
            className="yellow-input"
            onChange={changeHandler}
          />
          <label className='active' htmlFor="email">Email</label>
        </div>

        <div className="input-field">
          <input 
            id="password"
            name='password'
            placeholder='Enter password'
            type="password"
            required
            className="yellow-input"
            onChange={changeHandler}
          />
          <label className='active' htmlFor="password">Password</label>
        </div>
      </div>
    </div>

    <div className="card-action">
      <button
        disabled={loading}
        className="dark-btn"
      >
        Sign up
      </button>
    </div>
  </form>
  )
}

export default SignUpForm