import { Redirect, Route, Switch } from "react-router-dom";
import AddUserPage from "../pages/addUserPage/addUserPage";
import DashbaordPage from "../pages/dashboardPage/dashboardPage";
import HistoriquePage from "../pages/historiquePage/historiquePage";
import ProfilePage from "../pages/profilePage/profilePage";

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
      <Route exact path="/admin/add-user">
        <AddUserPage role="admin" />
      </Route>
      <Route exact path="*">
        <Redirect to="/admin/accueil" />
      </Route>
    </Switch>
  );
};
