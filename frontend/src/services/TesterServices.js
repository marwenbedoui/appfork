import axios from "axios";
import JwtDecode from "jwt-decode";

const API_URL = "http://localhost:5000/api/v1/";

const login = (email, password) =>
  axios
    .post(`${API_URL}login`, {
      email,
      password,
    })
    .then((response) => {
      if (typeof response.data.token !== "undefined") {
        const role = JwtDecode(response.data.token).userRole;
        localStorage.setItem("user", role);
      }
      return response.data;
    });

const logout = () => {
  localStorage.removeItem("user");
};

const TestAuthService = {
  login,
  logout,
};

export default TestAuthService;
