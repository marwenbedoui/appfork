import { Redirect, Route, Switch } from "react-router-dom";
import ProfilePage from "../pages/profilePage/profilePage";
import DashbaordPage from "../pages/dashboardPage/dashboardPage";
import HistoriquePage from "../pages/historiquePage/historiquePage";
import ResultTestPage from "../pages/resultTestPage/resultTestPage";

export const SimpleUserRouters = () => {
  return (
    <Switch>
      <Route exact path="/simpleUser/accueil">
        <DashbaordPage role="simpleUser" />
      </Route>
      <Route exact path="/simpleUser/historiques">
        <HistoriquePage role="simpleUser" />
      </Route>
      <Route exact path="/simpleUser/profile">
        <ProfilePage role="simpleUser" />
      </Route>
      <Route exact path="/simpleUser/test/:id">
        <ResultTestPage role="simpleUser" />
      </Route>
      <Route exact path="*">
        <Redirect to="/simpleUser/accueil" />
      </Route>
    </Switch>
  );
};
