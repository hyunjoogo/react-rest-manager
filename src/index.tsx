import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import NotFound from "./pages/NotFound";
import MyRest from "./pages/my-rest";
import ProtectedRoute from './pages/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <NotFound/>,
    children: [
      {index: true, path: '/', element: <MyRest/>},
      {path: '/products', element: <NotFound/>},
      {
        path: '/products/new',
        element: (
          <ProtectedRoute requireAdmin>
            <MyRest />
          </ProtectedRoute>
        ),
      },
      {
        path: '/products/:id',
        element: <MyRest/>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<RouterProvider router={router}/>);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
