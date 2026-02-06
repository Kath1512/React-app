import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import Profile from './pages/Profile.jsx'

const router = createBrowserRouter([
    { path: '/', element: <App />, errorElement: <NotFoundPage /> },
    { path: '/Home', element: <Home /> },
    { path: '/About', element: <About /> },
    { path: '/Contact', element: <Contact /> },
    { path: '/profiles/:id', element: <Profile />}
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
