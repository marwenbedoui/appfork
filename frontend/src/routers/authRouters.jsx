import { Redirect, Route, Switch } from "react-router-dom";
import { LoginPage } from "../pages/loginPage/loginPage";

export const AuthRouters = () => {
  return (
    <Switch>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="*">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
};
