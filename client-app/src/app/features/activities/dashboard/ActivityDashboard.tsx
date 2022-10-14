import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import NavBar from "../../../layout/NavBar";

import { useStore } from "../../../stores/store";
import ActivityFilters from "./ActivityFilters";

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
    return <LoadingComponent content="ASDASDASDASDASDASDASDADASD" />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>

      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashboard);
