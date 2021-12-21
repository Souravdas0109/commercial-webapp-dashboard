import axios from "axios";

export const userV2Login = (idToken: any) => {
  const data = new URLSearchParams();
  data.append("grant_type", "password");
  data.append("id_token", idToken);
  return axios({
    method: "POST",
    url: `https://sit-api.morrisons.com/user/v2/token?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
    data,
  });
};

export const colleagueV2Login = (accesToken: any) => {
  return axios({
    method: "GET",
    url: `https://sit-api.morrisons.com/colleague/v1/colleagues/@me?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accesToken}`,
    },
  });
};
// export const userDetailsLogin = (accesToken: any, employeeID: any) => {
//   return axios({
//     method: "GET",
//     url: `https://dev-api.morrisons.com/commercial-user/v1/userdetails/${employeeID}?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
//     headers: {
//       "content-type": "application/json",
//       Authorization: `Bearer ${accesToken}`,
//     },
//   });
// };
