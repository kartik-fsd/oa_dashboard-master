import React from "react";
import { Switch, Route } from "react-router-dom";

//Layouts
import NonAuthLayout from "../layouts/NonAuthLayout";
import VerticalLayout from "../layouts/index";
//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import { AuthProtected, AccessRoute } from "./AuthProtected";
import Login from "../pages/Authentication/Login";
import { api } from "../globalConfig";
import { extract_token } from "../assets/utils/common";
import axios from "axios";

const Index = () => {
  const availablePublicRoutesPaths = publicRoutes.map((r) => r.path);
  const availableAuthRoutesPath = authProtectedRoutes.map((r) => r.path);
  return (
    <React.Fragment>
      <Switch>
        <Route path={availablePublicRoutesPaths}>
          <NonAuthLayout>
            <Switch>
              {publicRoutes.map((route, idx) => (
                <Route
                  path={route.path}
                  component={route.component}
                  key={idx}
                  exact={true}
                />
              ))}
            </Switch>
          </NonAuthLayout>
        </Route>

        <Route path={availableAuthRoutesPath}>
          <AuthProtected>
            <VerticalLayout>
              <Switch>
                {authProtectedRoutes?.map((route, idx) => (
                  <AccessRoute
                    path={route.path}
                    component={route.component}
                    key={idx}
                    exact={true}
                  />
                ))}
              </Switch>
            </VerticalLayout>
          </AuthProtected>
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default Index;
