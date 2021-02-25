import React, { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import routes from '../routes.js';
import UserName from '../UserNameContext';

const InputForm = () => {
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const userName = useContext(UserName);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef, currentChannelId]);

  return (
    <div className="mt-auto">
      <Formik
        initialValues={{
          message: '',
        }}
        onSubmit={async ({ message }, { setErrors, resetForm }) => {
          if (!message.trim()) {
            return;
          }
          const url = routes.channelMessagesPath(currentChannelId);
          const data = {
            attributes: {
              name: userName,
              message,
            },
          };
          try {
            await axios.post(url, { data });
            resetForm();
          } catch (e) {
            setErrors({ message: e.message });
          }
        }}
      >
        {({ handleSubmit, errors, isSubmitting }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="form-group">
              <div className="input-group">
                <Field innerRef={inputRef} name="message" aria-label="body" className="mr-2 form-control" />
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </div>
            </div>
            <FormControl.Feedback type="invalid" className="d-block">
              {errors.message}
            </FormControl.Feedback>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InputForm;
