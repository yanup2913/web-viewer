import React, { lazy } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { ErrorBoundaryWithSuspense } from "./shared-components/error-and-suspense-boundries";
import { positions, Provider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Loader from "./shared-components/loader";

const ALERT_OPTIONS = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

const LazyLogin = lazy(() =>
  import(
    /* webpackChunkName: "login-page" */
    /* webpackPrefetch: true */
    "./login/login-signup"
  )
);

const LazyHome = lazy(() =>
  import(
    /* webpackChunkName: "home-page" */
    /* webpackPrefetch: true */
    "./home/web-viewer"
  )
);

export default function RouteWrapper() {
  return (
    <BrowserRouter>
      <RouteHandler />
    </BrowserRouter>
  );
}

function RouteHandler() {
  const history = useHistory();

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(routerProps) => (
          <Provider template={AlertTemplate} {...ALERT_OPTIONS}>
            <ErrorBoundaryWithSuspense fallback={<Loader />}>
              <LazyHome {...{ routerProps, history }} />
            </ErrorBoundaryWithSuspense>
          </Provider>
        )}
      />
      <Route
        exact
        path="/login"
        render={(routerProps) => (
          <Provider template={AlertTemplate} {...ALERT_OPTIONS}>
            <ErrorBoundaryWithSuspense fallback={<Loader />}>
              <LazyLogin {...{ routerProps, history }} />
            </ErrorBoundaryWithSuspense>
          </Provider>
        )}
      />
    </Switch>
  );
}
