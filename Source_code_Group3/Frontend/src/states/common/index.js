import * as constants from "./constants";
const axios = require("axios");

export const callApi = (url, method, data) => {
  return axios({
    method: method,
    url: `${constants.URL}/${url}`,
    headers: {
      Authorization: "*"
    },
    data:data,
  })
};

export const downloadApi = (url, method, data) => {
  return axios({
    method: method,
    url: `${constants.URL}/${url}`,
    responseType: 'blob',
    headers: {
      Authorization: "*"
    },
    data:data,
  })
};

export default function callLoginApi ( endpoint,method,data,success){
  return axios({  
    method: method,
    url: `${constants.URL}/${endpoint}`,
      data: data
    })

}
   
