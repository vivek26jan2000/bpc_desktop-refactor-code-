import axios from "axios";
import {
  loginUrl,
  agentConfigUrl,
  selectedParametersUrl,
  siteModuleParamUrl,
  operatorLoginUrl,
  operatorUploadUrl,
} from "./api";

export const loginAction = async (username, password) => {
  const response = await axios.post(loginUrl(), {
    username,
    password,
  });
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

export const operatorLoginAction = async (username, password) => {
  const response = await axios.post(operatorLoginUrl(), {
    username,
    password,
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

export const operatorUploadAction = async (username) => {
  return axios.get(operatorUploadUrl(username)).then((response) => {
    return response.data;
  });
};

export const agentConfigAction = (params) => {
  return axios
    .post(agentConfigUrl(), {
      ...params,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const siteModuleParamAction = (siteID) => {
  return axios.get(siteModuleParamUrl(siteID)).then((response) => {
    return response.data;
  });
};

export const selectedParametersAction = (params) => {
  return axios
    .post(selectedParametersUrl(), {
      ...params,
    })
    .then((response) => {
      return response.data;
    });
};

// //example
// // export const loginAction = async (payload) => {
// //   try {
// //     let { data } = await axios.post(loginUrl(), payload);
// //     return data;
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };
// export const loginAction = async (username, password) => {
//   try {
//     const res = await axios({
//       method: "post",
//       url: "localhost:8080/api/v1/auth/signin/",
//       data: {
//         username,
//         password,
//       },
//     });
//     if (res.data.status === "success") {
//       // showAlert('success', 'Login Sucessfully');
//       console.log("login successfully");
//       // window.setTimeout(() => {
//       //   location.assign("/");
//       // }, 5500);
//     }
//   } catch (err) {
//     // showAlert('error', err.response.data.message);
//     console.log(err);
//   }
// };
