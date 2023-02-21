import { LoginPage } from "./pages/loginPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TesteurPage from "./pages/testeurPage";
import AdminPage from "./pages/adminPage";
import UserSimplePage from "./pages/userSimplePage";

function App() {
  if (localStorage.getItem("user") === "usersimple") {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/user">
              <UserSimplePage />
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
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/tester">
              <TesteurPage />
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
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
