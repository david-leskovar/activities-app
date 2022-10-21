import { observer } from "mobx-react-lite";
import React from "react";
import { Card, Grid, GridColumn, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import ProfileCard from "./ProfileCard";

export default observer(function ProfileFollowings() {
  const { profileStore } = useStore();

  const { profile, followings, loadingFollowings, activeTab } = profileStore;

  return (
    <Tab.Pane loading={loadingFollowings}>
      <Grid>
        <GridColumn width={16}>
          <Header
            floated="left"
            icon="user"
            content={
              activeTab === 3
                ? `People following ${profile?.displayName}`
                : `People ${profile?.displayName} is following`
            }
          />
        </GridColumn>

        <GridColumn width={16}>
          <Card.Group itemsPerRow={4}>
            {followings.map((profiles) => (
              <ProfileCard key={profiles?.username} profile={profiles} />
            ))}
          </Card.Group>
        </GridColumn>
      </Grid>
    </Tab.Pane>
  );
});
