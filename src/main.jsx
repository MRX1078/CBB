import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Result from "./Components /Result/Result.jsx";
import Photo from "./Components /Photo/Photo.jsx";
import Upload from "./Components /Upload/Upload.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/result",
        element: <Result />,
    },
    {
        path: "/photo",
        element: <Photo />
    },
    {
        path: "/upload",
        element: <Upload />,
    }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
