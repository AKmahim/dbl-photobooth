import React from 'react'
import App from './App.jsx'

import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Main from './Layout/Main.jsx';
import Home from './components/Home/Home.jsx';
import CountDown from './Page/CountDown/CountDown.jsx';
import Preview from './Page/Preview/Preview.jsx';
import QrPage from './Page/QrPage/QrPage.jsx';
import CaptureImage from './Page/CaptureImage/CaptureImage.jsx';
// import 'index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path: "/",
        element:<Home></Home>,

      },
      {
        path:"count-down",
        element: <CountDown></CountDown>
      },
      {
        path: "preview",
        element: <Preview></Preview>
      },
      {
        path: "qr-code",
        element: <QrPage></QrPage>
      },
      {
        path: "capture-image",
        element: <CaptureImage></CaptureImage>
      }
      
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
