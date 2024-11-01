import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import {  Header, Loader } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Confusion bhaneko why if(userData) condition is checked inside .then()
  // because if .then is called , it means the promise is resolved and promise resolved == user is created , so why internal if(userData) check ?
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        console.log(userData)
        if (userData) dispatch(login(userData));
        else dispatch(logout());
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full min-h-screen">
          <Header />
          <main>
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
}

export default App;

// Approach 1 : using global state
