import {useAuth} from "./authHook.js";
import {Navigate, Outlet} from "react-router-dom";

const Middleware = () => {
  const isAuth = useAuth()

  if (!isAuth) {
    return <Navigate to="/sign-up" />
  }

  return <Outlet />
}

export default Middleware;
