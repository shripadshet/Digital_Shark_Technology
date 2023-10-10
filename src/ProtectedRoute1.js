import { Navigate } from "react-router-dom";
import Home from "./Components/Home";

const ProtectedRoute1 =(isAuth) =>{

isAuth =localStorage.getItem("mytoken")

return isAuth ? <Home/> : <Navigate to="/login"/>;


}
export default ProtectedRoute1;