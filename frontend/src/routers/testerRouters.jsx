import { Redirect, Route, Switch } from "react-router-dom";
import ProfilePage from "../pages/profilePage/profilePage";
import DashbaordPage from "../pages/dashboardPage/dashboardPage";
import HistoriquePage from "../pages/historiquePage/historiquePage";
import ResultTestPage from "../pages/resultTestPage/resultTestPage";

export const TesterRouters = () => {
  return (
    <Switch>
      <Route exact path="/tester/accueil">
        <DashbaordPage role="tester" />
      </Route>
      <Route exact path="/tester/historiques">
        <HistoriquePage role="tester" />
      </Route>
      <Route exact path="/tester/profile">
        <ProfilePage role="tester" />
      </Route>
      <Route exact path="/tester/test/:id">
        <ResultTestPage role="tester" />
      </Route>
      <Route exact path="*">
        <Redirect to="/tester/accueil" />
      </Route>
    </Switch>
  );
};
