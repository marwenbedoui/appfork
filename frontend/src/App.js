import { BrowserRouter as Router } from "react-router-dom";
import AdminPage from "./pages/adminPage";
import AuthVerifyService from "./services/AuthVerifyService";
import { AuthRouters } from "./routers/authRouters";
import { TesterRouters } from "./routers/testerRouters";
import { SimpleUserRouters } from "./routers/simpleUserRouters";

function App() {
  if (AuthVerifyService.authVerify() === 1) {
    return (
      <Router>
        <SimpleUserRouters />
      </Router>
    );
  }
  if (AuthVerifyService.authVerify() === 2) {
    return (
      <Router>
        <TesterRouters />
      </Router>
    );
  }
  if (AuthVerifyService.authVerify() === 3) {
    return (
      <Router>
        <AdminPage />
      </Router>
    );
  }
  if (AuthVerifyService.authVerify() === 0) {
    return (
      <Router>
        <AuthRouters />
      </Router>
    );
  }
}

export default App;
