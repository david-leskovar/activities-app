import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image size="massive" src="/assets/logo.png" alt="logo" />
          Reactivities
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as="h2" inverted content="Welcome to Reactivities" />
            <Button as={Link} to="/activities" inverted>
              Go to Activities!
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              inverted
            >
              Login!
            </Button>

            <Button
              onClick={() => modalStore.openModal(<RegisterForm />)}
              inverted
            >
              Register!
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
});
