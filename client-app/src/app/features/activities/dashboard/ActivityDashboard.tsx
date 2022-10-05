import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import NavBar from "../../../layout/NavBar";

import { useStore } from "../../../stores/store";

import ActivityList from "./ActivityList";

function ActivityDashboard() {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry } = activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1) {
      loadActivities();
    }
  }, [activityRegistry.size, loadActivities]);

  if (activityStore.loadingInitial)
    return (
      <Fragment>
        <NavBar />
        <LoadingComponent inverted={false} />
      </Fragment>
    );

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>

      <Grid.Column width="6">
        <h2>Activity fitlers</h2>
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashboard);
