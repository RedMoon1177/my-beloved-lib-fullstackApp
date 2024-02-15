import { useNavigate } from "react-router-dom";
import authService from "../services/authService";


const Logout = () => {

    const navigate = useNavigate();

    authService.logout((logoutSuccessful) => {
        if(logoutSuccessful){
            console.log('SUCCESS')
            navigate('/') // Main.jsx
        } else {
            console.log('NO SUCCESS')
            return false;
        }
    });

    return true;
}

export default Logout;