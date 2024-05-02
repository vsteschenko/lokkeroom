import React from 'react';
import { createRoot } from 'react-dom/client';
import Login from './components/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './components/SignUp';
import CreateLobby from './components/CreateLobby';
import Home from './components/Home'
import './index.css';

const router = createBrowserRouter([
  {
    path: "/register",
    element: <SignUp />
  }, {
    path: "/info",
    element: <SignUp />
  }, {
    path: "/login",
    element: <Login />
  }, {
    path: "/createlobby",
    element: <CreateLobby />
  }, {
    path: "/",
    element: <Home />
  }
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);