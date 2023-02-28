import { Redirect, Route, Switch } from "react-router-dom";
import ProfilePage from "../pages/profilePage/profilePage";
import DashbaordPage from "../pages/testeurPages/dashboardPage/dashboardPage";
import HistoriquePage from "../pages/testeurPages/historiquePage/historiquePage";

export const TesterRouters = () => {
  return (
    <Switch>
      <Route exact path="/testeur/accueil">
        <DashbaordPage role="testeur" />
      </Route>
      <Route exact path="/testeur/historiques">
        <HistoriquePage role="testeur" />
      </Route>
      <Route exact path="/testeur/profile">
        <ProfilePage role="testeur" />
      </Route>
      <Route exact path="*">
        <Redirect to="/testeur/accueil" />
      </Route>
    </Switch>
  );
};
