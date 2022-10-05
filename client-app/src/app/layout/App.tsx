import React, { useEffect } from "react";

import "./styles.css";

import { Container } from "semantic-ui-react";

import NavBar from "./NavBar";
import { Fragment } from "react";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";

import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return (
      <Fragment>
        <NavBar />

        <LoadingComponent inverted={false} />
      </Fragment>
    );

  return (
    <Fragment>
      <NavBar />

      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
}

export default observer(App);