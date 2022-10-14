import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
  inverted?: boolean;
  content?: string;
}

export default function LeadingComponent({
  inverted = true,
  content = "Loading...",
}: Props) {
  return (
    <Dimmer active>
      <Loader indeterminate>{content}</Loader>
    </Dimmer>
  );
}
