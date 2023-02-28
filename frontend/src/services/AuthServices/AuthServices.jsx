import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/";

const login = (email, password) =>
  axios
    .post(`${API_URL}login`, {
      email,
      password,
    })
    .then((response) => {
      if (typeof response.data.token !== "undefined") {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    });

const logout = () => {
  localStorage.removeItem("user");
};

const AuthService = {
  login,
  logout,
};

export default AuthService;
