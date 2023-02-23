import { Redirect, Route, Router, Switch } from "react-router-dom";
import DashbaordPage from "../pages/testeurPages/dashboardPage/dashboardPage";
import HistoriquePage from "../pages/testeurPages/historiquePage/historiquePage";

export const TesterRouters = () => {
  return (
    <Switch>
      <Route exact path="/testeur/accueil">
        <DashbaordPage />
      </Route>
      <Route exact path="/testeur/historiques">
        <HistoriquePage />
      </Route>
      <Route exact path="*">
        <Redirect to="/testeur/accueil" />
      </Route>
    </Switch>
  );
};
