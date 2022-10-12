import React, { useEffect } from "react";
import { Segment, Button, Header } from "semantic-ui-react";

import { useState } from "react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingComponent from "../../../layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../common/form/MyTextInput";
import MyTextArea from "../../../common/form/MyTextArea";
import MySelectInput from "../../../common/form/MySelectInput";
import { categoryOptions } from "../../../common/options/categoryOptions";
import MyDateInput from "../../../common/form/MyDateInput";
import { Activity } from "../../../models/activity";

export default observer(function ActivityForm() {
  const history = useHistory();
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required!"),
    description: Yup.string().required("The activity description is required!"),
    category: Yup.string().required(),
    date: Yup.string().required("date is required").nullable(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
    else {
      activityStore.setLoadingInitial(false);
    }
  }, [id, loadActivity, activityStore]);

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

  function handleFormSubmit(activity: Activity) {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      updateActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  }

  /*
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  */
  /*
  useEffect(() => {
    setActivity(initialState);
  }, [initialState, selectedActivity]);

  */

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        initialValues={activity}
        enableReinitialize
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="title" />

            <MyTextArea
              placeholder="Description"
              name="description"
              rows={3}
            ></MyTextArea>
            <MySelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            ></MySelectInput>
            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            ></MyDateInput>

            <Header content="Location Details" sub color="teal" />
            <MyTextInput name="city" placeholder="City"></MyTextInput>
            <MyTextInput name="venue" placeholder="Venue"></MyTextInput>
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            ></Button>
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancel"
            ></Button>
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
