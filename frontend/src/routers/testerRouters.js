import { Redirect, Route, Router, Switch } from "react-router-dom";
import TesteurPage from "../pages/testeurPage";

export const TesterRouters = () => {
  return (
    <Switch>
      <Route exact path="/test">
        <TesteurPage />
      </Route>
      <Route exact path="*">
        <Redirect to="/test" />
      </Route>
    </Switch>
  );
};
