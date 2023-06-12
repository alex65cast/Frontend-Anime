import axios from "axios";

export const loginMe = async(credentials) =>{
    return await axios.post('http://localhost:3000/user/login', credentials);
}

export const register = async(data)=>{

  return await axios.post(`http://localhost:3000/user/`, data);

}