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

function App() {
  if (localStorage.getItem("user") === "simpleUser") {
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
  if (localStorage.getItem("user") === "tester") {
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
  if (localStorage.getItem("user") === "admin") {
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
  if (localStorage.getItem("user") === null) {
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
