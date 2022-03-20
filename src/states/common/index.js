import * as constants from "./constants";

const axios = require("axios");



export const callApi = (url, method, data) => {
  const token = localStorage.getItem("admin-token");
  return axios({
    method: method,
    url: `${constants.URL}/${url}`,
    headers: {
      Authorization: token
    },
    data:data,
  })
};

export const callApiTccd = (url, method, data) => {
  const token = localStorage.getItem("tccd-token");
  return axios({
    method: method,
    url: `${constants.URL}/${url}`,
    headers: {
      Authorization: token
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
   
