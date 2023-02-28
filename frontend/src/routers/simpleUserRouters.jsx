import { Redirect, Route, Switch } from "react-router-dom";
import ProfilePage from "../pages/profilePage/profilePage";
import DashbaordPage from "../pages/testeurPages/dashboardPage/dashboardPage";
import HistoriquePage from "../pages/testeurPages/historiquePage/historiquePage";

export const SimpleUserRouters = () => {
  return (
    <Switch>
      <Route exact path="/user/accueil">
        <DashbaordPage role="user" />
      </Route>
      <Route exact path="/user/historiques">
        <HistoriquePage role="user" />
      </Route>
      <Route exact path="/user/profile">
        <ProfilePage role="user" />
      </Route>
      <Route exact path="*">
        <Redirect to="/user/accueil" />
      </Route>
    </Switch>
  );
};
