import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from './Layouts/Layout.jsx';
import Home from './Component/Home.jsx';
import Login from './Component/Login.jsx';
import Register from './Component/Register.jsx';
import Error from './Component/Error.jsx';
import AddTransaction from './Pages/AddTransaction.jsx';
import MyTransactions from './Pages/MyTransactions.jsx';
import Reports from './Pages/Reports.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
        {
        path: 'Add-Transaction',
        element: <AddTransaction></AddTransaction>
      },
      {
        path: 'My-Transaction',
        element: <MyTransactions></MyTransactions>
      },
      {
        path: 'Reports',
        element: <Reports></Reports>
      },

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
