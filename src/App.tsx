import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ListDetails from './components/ListDetails';
import ListGrid from './components/ListGrid';
import NoteDetailsCard from './components/NoteDetailsCard';
import MainLayout from './Pages/MainLayout';
import ListForm from './components/ListForm';
import MyContents from './components/MyContents';
import { LoginPage } from './Pages/LoginPage';
import NotFoundPage from './Pages/NotFoundPage';
import Privacy from './Pages/Privacy';
import SignUpPage from './Pages/SignUpPage';
import TermsOfService from './Pages/TermsOfService';
import { ProfileProvider } from './context/CreditContext';
import Checkout from './Pages/Checkout';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
          <ProfileProvider>
            <MainLayout />
          </ProfileProvider>
          ),
        errorElement: <NotFoundPage />,
        children: [
          { path: '/', element: <ListGrid />, },
          { path: '/list/:slug', element: <ListDetails />, },
          { path: '/note/:noteSlug', element: <NoteDetailsCard />, },
          { path: '/create-a-new-list', element: <ListForm />, },
          { path: '/my-contents', element: <MyContents />, },
        ],
    },
    { path: 'login', element: <LoginPage />, },
    { path: 'signup', element: <SignUpPage />, },
    { path: 'checkout', element: <Checkout />, },
    { path: 'privacy', element: <Privacy />, },
    { path: 'terms-of-service', element: <TermsOfService />, },
]);

function App() {
  return (
    <AuthProvider> 
        <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;