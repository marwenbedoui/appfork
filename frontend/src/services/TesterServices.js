export const Login = (email, password) => {
  if (email === "azizbensalem1998@gmail.com" && password === "Test1234!") {
    localStorage.setItem("user", "usersimple");
    window.location.href = "/user";
  } else if (email === "anouar.refifa@gmail.com" && password === "Test1234!") {
    localStorage.setItem("user", "tester");
    window.location.href = "/tester";
  } else if (email === "admin@gmail.com" && password === "Test1234!") {
    localStorage.setItem("user", "admin");
    window.location.href = "/admin";
  } else {
    return new Error("Incorrect email or password");
  }
};
