import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layouts/Layout.jsx";
import Home from "./Component/Home.jsx";
import Login from "./Component/Login.jsx";
import Register from "./Component/Register.jsx";
import Error from "./Component/Error.jsx";
import AddTransaction from "./Pages/AddTransaction.jsx";
import MyTransactions from "./Pages/MyTransactions.jsx";
import Reports from "./Pages/Reports.jsx";
import Authprovider from "./Provider/Authprovider.jsx";
import PrivateRoute from "./PrivetRoute/PrivateRoute.jsx";
import MyProfile from "./Component/MyProfile.jsx";
import DetailsPage from "./Pages/Detailspage.jsx";
import UpdateTransaction from "./Pages/Update.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "Add-Transaction",
        element: (
          <PrivateRoute>
            <AddTransaction></AddTransaction>
          </PrivateRoute>
        ),
      },
      {
        path: "My-Transaction",
        element: (
          <PrivateRoute>
            <MyTransactions></MyTransactions>
          </PrivateRoute>
        ),
      },
      {
        path: "Reports",
        element: (
          <PrivateRoute>
            <Reports></Reports>
          </PrivateRoute>
        ),
      },
      {
        path: "My-Profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/transaction-details/:id",
        element: <PrivateRoute>
          <DetailsPage></DetailsPage>
        </PrivateRoute>
      },
      {
        path: "/update-transaction/:id",
        element: <PrivateRoute>
          <UpdateTransaction></UpdateTransaction>
        </PrivateRoute>
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Authprovider>
      <RouterProvider router={router} />
    </Authprovider>
  </StrictMode>
);
