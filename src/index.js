import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PostContext from './Context/Post';
import Other from './OtherPage';
import OtherContext from './Context/Like';
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>
  },
  {
    path:'/about',
    element:<Other></Other>
  }
])
root.render(
  <OtherContext>
    <PostContext>
    <React.StrictMode>
      <RouterProvider router={router}>

      </RouterProvider>
    </React.StrictMode>
  </PostContext>
  </OtherContext>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
