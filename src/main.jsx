import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";

// import Home from "./pages/Home.jsx";
// import Authlayout  from "./components/Authlayout.jsx";
// import Login from "./pages/Login.jsx";
// import Signup from "./pages/Signup.jsx";
// import AddPost from "./pages/AddPost.jsx";
// import EditPost from "./pages/EditPost.jsx";
// import Post from "./pages/Post.jsx";
// import MyPosts from "./pages/MyPosts.jsx";

const MyPosts = lazy(() => import("./pages/MyPosts.jsx"));
const Post = lazy(() => import("./pages/Post.jsx"));
const EditPost = lazy(() => import("./pages/EditPost.jsx"));
const AddPost = lazy(() => import("./pages/AddPost.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Authlayout = lazy(() => import("./components/Authlayout.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));

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
      <Route
        path="login"
        element={
          <Authlayout authentication={false}>
            <Login />
          </Authlayout>
        }
      />
      <Route
        path="signup"
        element={
          <Authlayout authentication={false}>
            <Signup />
          </Authlayout>
        }
      />
      <Route
        path="my-posts"
        element={
          <Authlayout authentication>
            <MyPosts />
          </Authlayout>
        }
      />
      <Route
        path="add-post"
        element={
          <Authlayout authentication>
            <AddPost />
          </Authlayout>
        }
      />
      <Route
        path="edit-post/:slug"
        element={
          <Authlayout authentication>
            <EditPost />
          </Authlayout>
        }
      />
      <Route
        path="post/:slug"
        element={
          <Authlayout authentication>
            <Post />
          </Authlayout>
        }
      />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
