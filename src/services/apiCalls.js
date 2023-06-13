import axios from "axios";

export const loginMe = async(credentials) =>{
    return await axios.post('http://localhost:3000/user/login', credentials);
}

export const register = async(data)=>{

  return await axios.post(`http://localhost:3000/user/`, data);

}

export const animeTop = async()=>{
    return await axios.get('https://api.jikan.moe/v4/top/anime');
}

export const bringUserProfile = async (token) => {

  let config = {
      headers: { 
        'Authorization': 'Bearer '+ token.token,  
      }
  };

  return await axios.get(`http://localhost:3000/user/${token.user.id}`, config);
}