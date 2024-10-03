import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Layout from './Pages/Layout'
import './index.css'
import HomePage from './Pages/HomePage'
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
)
