import { Redirect, Route, Router, Switch } from "react-router-dom";
import AdminPage from "../pages/adminPage";

export const AdminRouters = () => {
  return (
    <Switch>
      <Route exact path="/admin">
        <AdminPage />
      </Route>
      <Route exact path="*">
        <Redirect to="/admin" />
      </Route>
    </Switch>
  );
};
