import { Redirect, Route, Switch } from "react-router-dom";
import AllUsers from "../pages/AllUsersPage/AllUsers";
import DashbaordPage from "../pages/dashboardPage/dashboardPage";
import HistoriquePage from "../pages/historiquePage/historiquePage";
import ProfilePage from "../pages/profilePage/profilePage";
import ResultTestPage from "../pages/resultTestPage/resultTestPage";

export const AdminRouters = () => {
  return (
    <Switch>
      <Route exact path="/admin/accueil">
        <DashbaordPage role="admin" />
      </Route>
      <Route exact path="/admin/historiques">
        <HistoriquePage role="admin" />
      </Route>
      <Route exact path="/admin/profile">
        <ProfilePage role="admin" />
      </Route>
      <Route exact path="/admin/all-users">
        <AllUsers role="admin" />
      </Route>
      <Route exact path="/admin/test/:id">
        <ResultTestPage role="admin" />
      </Route>
      <Route exact path="*">
        <Redirect to="/admin/accueil" />
      </Route>
    </Switch>
  );
};
