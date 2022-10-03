import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface Props {
  openForm: () => void;
  createActivityButton: () => void;
}

function NavBar({ openForm, createActivityButton }: Props) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button
            onClick={createActivityButton}
            positive
            content="Create Activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default NavBar;
