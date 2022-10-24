import React, { useEffect } from "react";

import "./styles.css";

import { Container } from "semantic-ui-react";

import NavBar from "./NavBar";

import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";

import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import homePage from "../features/home/homePage";
import ActivityForm from "../features/activities/form/ActivityForm";
import ActivityDetails from "../features/activities/details/ActivityDetails";
import TestErrors from "../features/errors/TestErrors";
import { ToastContainer } from "react-toastify";
import NotFound from "../features/errors/NotFound";
import ServerError from "../features/errors/ServerError";

import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import ProfilePage from "../features/profiles/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import UserStore from "../stores/userStore";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  const { isLoggedIn } = userStore;

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent content="Loading app..." />;

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
      <Route exact path="/" component={homePage} />

      <Route
        path={"/(.+)"}
        render={() => (
          <>
            {isLoggedIn ? <NavBar /> : null}
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <PrivateRoute
                  exact
                  path="/activities"
                  component={ActivityDashboard}
                />
                <PrivateRoute
                  path="/activities/:id"
                  component={ActivityDetails}
                />
                <PrivateRoute
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                />
                <PrivateRoute
                  exact
                  path="/profiles/:username"
                  component={ProfilePage}
                />
                <PrivateRoute exact path="/errors" component={TestErrors} />
                <Route exact path="/server-error" component={ServerError} />

                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
