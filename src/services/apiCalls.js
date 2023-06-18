import axios from "axios";

const urlBack='http://localhost:3000';

export const loginMe = async(credentials) =>{
    return await axios.post(`${urlBack}/user/login`, credentials);
}

export const register = async(data)=>{

  return await axios.post(`${urlBack}/user/`, data);

}

export const animeTop = async()=>{
    return await axios.get('https://api.jikan.moe/v4/top/anime');
}

export const animeId = async(id)=>{
  return await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
}

export const mangaTop = async()=>{
  return await axios.get('https://api.jikan.moe/v4/top/manga');
}

export const bringUserProfile = async (token) => {

  let config = {
      headers: { 
        'Authorization': 'Bearer '+ token.token,  
      }
  };

  return await axios.get(`${urlBack}/user/${token.user.id}`, config);
}

export const bringAnimeList = async (token) => {

  let config = {
      headers: { 
        'Authorization': 'Bearer '+ token.token,  
      }
  };

  return await axios.get(`${urlBack}/anime/`, config);
}


export const bringUsersAdmin = async (token, nameUs) => {

  let config = {
      headers: { 
        'Authorization': 'Bearer '+ token.token,  
      },
      params:{
        name: nameUs
      }
  };

  return await axios.get(`${urlBack}/user/`, config);
}

export const searchAnimes = async(name)=>{
  return await axios.get(`https://api.jikan.moe/v4/anime?q=${name}&sfw`);
}

export const addAnimeList = async(data, token)=>{

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token.token,  
    }
  };

  // const requestData = { dat: data }; 
  return await axios.post(`${urlBack}/anime/`, data, config);

}

export const editAnimeList = async(idAnime,data, token)=>{

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token.token,  
    }
  };

  return await axios.patch(`${urlBack}/anime/${idAnime}`, data, config);
}

export const bringStatusAnime = async(token)=>{

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token.token,  
    }
  };

  return await axios.get(`${urlBack}/statusAnime/`, config);
}

