import React from 'react';
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook';
import 'materialize-css'
import { AuthContext } from './context/AuthContext';
import { NavBar } from './components/nav-bar';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const {token, userId, login, logout} = useAuth()
  const isAuth = !!token
  const routes = useRoutes(isAuth)
  return (
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuth
    }}>
      <Router>
        { isAuth && <NavBar/> }
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;