import { Redirect, Route, Router, Switch } from "react-router-dom";
import UserSimplePage from "../pages/userSimplePage";

export const SimpleUserRouters = () => {
  return (
    <Switch>
      <Route exact path="/user">
        <UserSimplePage />
      </Route>
      <Route exact path="*">
        <Redirect to="/user" />
      </Route>
    </Switch>
  );
};
