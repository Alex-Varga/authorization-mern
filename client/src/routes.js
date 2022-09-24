import React from 'react'
import {
  Routes,
  Navigate,
  Route
} from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { DetailPage } from './pages/DetailPage'
import { CreatePage } from './pages/CreatePage'
import { AuthPage } from './pages/auth-page/AuthPage'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path='/links' exact element={<LinksPage />}/>
        <Route path='/detail/:id' element={<DetailPage />}/>
        <Route path='/create' exact element={<CreatePage />}/>
        <Route path="*" element={<Navigate replace to="/create" />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path='/' exact element={<AuthPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}
