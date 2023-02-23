import { LoginPage } from "./pages/loginPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import TesteurPage from "./pages/testeurPage";
import AdminPage from "./pages/adminPage";
import UserSimplePage from "./pages/userSimplePage";
import AuthVerifyService from "./services/AuthVerifyService";

function App() {
  if (AuthVerifyService.authVerify() === 1) {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/user">
              <UserSimplePage />
            </Route>
            <Route exact path="*">
              <Redirect to="/user" />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
  if (AuthVerifyService.authVerify() === 2) {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/tester">
              <TesteurPage />
            </Route>
            <Route exact path="*">
              <Redirect to="/tester" />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
  if (AuthVerifyService.authVerify() === 3) {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/admin">
              <AdminPage />
            </Route>
            <Route exact path="*">
              <Redirect to="/admin" />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
  if (AuthVerifyService.authVerify() === 0) {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="*">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
