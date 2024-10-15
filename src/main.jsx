import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Home from "./pages/Home.jsx";
import { Authlayout } from "./components";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AllPost from "./pages/AllPost.jsx";
import AddPost from "./pages/AddPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="login"element={ <Authlayout authentication={false}><Login /></Authlayout>}/>
      <Route path="signup"element={ <Authlayout authentication={false}><Signup /></Authlayout>}/>
      <Route path="all-posts"element={ <Authlayout authentication><AllPost /></Authlayout>}/>
      <Route path="add-post"element={ <Authlayout authentication><AddPost /></Authlayout>}/>
      <Route path="edit-post/:slug"element={ <Authlayout authentication><EditPost /></Authlayout>}/>
      <Route path="post/:slug"element={ <Authlayout authentication><Post /></Authlayout>}/>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
