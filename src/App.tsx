import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './utils/PrivateRoute'
import CommentsList from './components/CommentsList';
import CommentsPreview from './components/CommentsPreview';
import Header from './components/Header';
import ListDetails from './components/ListDetails';
import ListGrid from './components/ListGrid';
import NoteForm from './components/NoteForm';
import NoteDetailsCard from './components/NoteDetailsCard';
import Sidenav from './Pages/Sidenav';
import Vote from './components/Vote';
import MainLayout from './Pages/MainLayout';
import ListForm from './components/ListForm';
import { LoginPage } from './Pages/LoginPage';
import NotFoundPage from './Pages/NotFoundPage';
import SignUpPage from './Pages/SignUpPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <NotFoundPage />,
        children: [
          { path: '/', element: <ListGrid />, },
          { path: '/list/:slug', element: <ListDetails />, },
          { path: '/note/:noteSlug', element: <NoteDetailsCard />, },
          { path: '/create-a-new-list', element: <ListForm />, },
        ],
    },
    { path: 'login', element: <LoginPage />, },
    { path: 'signup', element: <SignUpPage />, },
]);

function App() {
  return (
    <AuthProvider> 
        <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;