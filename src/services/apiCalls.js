import axios from "axios";

export const loginMe = async(credentials) =>{
    return await axios.post('http://localhost:3000/user/login', credentials);
}