import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Admin from '../pages/admin';
import Home from '../pages/home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <div>Errors</div>
    },
    {
        path: '/admin',
        element: <Admin />
    },
    {
        path: '/app',
        element: <App />
    }
]);

function RouterWraper() {
    return <RouterProvider router={router} />;
}

export default RouterWraper;
