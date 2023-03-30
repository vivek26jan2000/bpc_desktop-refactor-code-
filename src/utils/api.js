export const API_URL = "http://localhost:8080/api/v1/auth/"; //Base Url

export const loginUrl = () => {
  return API_URL + "signin";
};

export const agentConfigUrl = () => {
  return API_URL + "addAgentConfig";
};

export const siteModuleParamUrl = (siteID) => {
  return API_URL + `sitemoduleparam/${siteID}`;
};

export const selectedParametersUrl = () => {
  return API_URL + "selectedparams";
};

export const operatorLoginUrl = () => {
  return "http://localhost:8080/api/v1/operator/signin";
};

export const operatorUploadUrl = (username) => {
  return `http://localhost:8080/api/v1/operator/upload/${username}`;
};
