import React, { ChangeEvent, useEffect, useMemo } from "react";
import { Segment, Form, Button } from "semantic-ui-react";

import { useState } from "react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    selectedActivity,
    closeForm,
    createActivity,
    updateActivity,
    loading,
  } = activityStore;

  /*
  const initialState = useMemo(() => {
    return (
      selectedActivity ?? {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      }
    );
  }, [selectedActivity]);

  */

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
    activity.id ? updateActivity(activity) : createActivity(activity);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  /*
  useEffect(() => {
    setActivity(initialState);
  }, [initialState, selectedActivity]);

  */
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
          type="date"
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
          loading={loading}
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
});
