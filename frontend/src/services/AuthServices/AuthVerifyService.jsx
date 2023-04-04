import jwtDecode from "jwt-decode";

const authVerify = () => {
  const token = localStorage.getItem("token");
  if (token) {
    if (jwtDecode(token).exp * 1000 < Date.now()) {
      localStorage.clear();
      return 0;
    }
    if (jwtDecode(token).userRole === "simpleUser") {
      return 1;
    }
    if (jwtDecode(token).userRole === "tester") {
      return 2;
    }
    if (jwtDecode(token).userRole === "admin") {
      return 3;
    }
  }
  return 0;
};

const userRole = () => {
  const token = localStorage.getItem("token");
  if (token) {
    if (jwtDecode(token).exp * 1000 < Date.now()) {
      localStorage.clear();
      return 0;
    }
    return jwtDecode(token).userRole;
  }
};

const AuthVerifyService = {
  authVerify,
  userRole,
};

export default AuthVerifyService;
