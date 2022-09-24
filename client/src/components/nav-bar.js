import React, { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const NavBar = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  
  const logoutHandler = (e) => {
    e.preventDefault()
    auth.logout()
    navigate('/');
  }
  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <NavLink to="/" className="brand-logo">Logo</NavLink>
        <ul className="right hide-on-med-and-down">
          <li><NavLink to="/create">Create</NavLink></li>
          <li><NavLink to="/links">Links</NavLink></li>
          <li><NavLink to="/" onClick={logoutHandler}>Logout</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}