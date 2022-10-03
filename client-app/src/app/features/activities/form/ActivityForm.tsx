import React, { ChangeEvent, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { Activity } from "../../../models/activity";
import { useState } from "react";

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
}

export default function ActivityForm({
  activity: selectedActivity,
  closeForm,
  createOrEdit,
}: Props) {
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  function handleSubmit(event: any) {
    createOrEdit(activity);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          name="title"
          onChange={handleInputChange}
          value={activity.title}
        ></Form.Input>
        <Form.TextArea
          placeholder="Description"
          name="description"
          onChange={handleInputChange}
          value={activity.description}
        ></Form.TextArea>
        <Form.Input
          placeholder="Category"
          name="category"
          onChange={handleInputChange}
          value={activity.category}
        ></Form.Input>
        <Form.Input
          placeholder="Date"
          name="date"
          onChange={handleInputChange}
          value={activity.date}
        ></Form.Input>
        <Form.Input
          name="city"
          placeholder="City"
          onChange={handleInputChange}
          value={activity.city}
        ></Form.Input>
        <Form.Input
          name="venue"
          placeholder="Venue"
          onChange={handleInputChange}
          value={activity.venue}
        ></Form.Input>
        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
        ></Button>
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={closeForm}
        ></Button>
      </Form>
    </Segment>
  );
}
