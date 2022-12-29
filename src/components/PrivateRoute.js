import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";
// import Spinner from "./Spinner";

export default function PrivateRoute() {
    const { loggedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) {
        return <p>LOADING</p>
    }

    return loggedIn ? <Outlet /> : <Navigate to='/signin' />
}