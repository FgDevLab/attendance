import axios from "axios";
import Cookies from "js-cookie";

export default function InitAxios() {
    const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
    
    axios.defaults.baseURL = backendUrl;
    
    const token = Cookies.get("auth-token");
    
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}
