import { BrowserRouter as Router } from "react-router-dom";
import AdminPage from "./pages/adminPage";
import AuthVerifyService from "./services/AuthServices/AuthVerifyService";
import { AuthRouters } from "./routers/authRouters";
import { TesterRouters } from "./routers/testerRouters";
import { SimpleUserRouters } from "./routers/simpleUserRouters";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  if (AuthVerifyService.authVerify() === 1) {
    return (
      <Router>
        <ToastContainer />
        <SimpleUserRouters />
      </Router>
    );
  }
  if (AuthVerifyService.authVerify() === 2) {
    return (
      <Router>
        <ToastContainer />
        <TesterRouters />
      </Router>
    );
  }
  if (AuthVerifyService.authVerify() === 3) {
    return (
      <Router>
        <ToastContainer />
        <AdminPage />
      </Router>
    );
  }
  if (AuthVerifyService.authVerify() === 0) {
    return (
      <Router>
        <ToastContainer />
        <AuthRouters />
      </Router>
    );
  }
}

export default App;
