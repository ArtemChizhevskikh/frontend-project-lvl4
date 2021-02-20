import React, { useEffect, useRef } from 'react';
import { Button, Modal, FormControl } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { addChannel } from '../../slices/channels.js';

const AddChannel = (props) => {
  const { modalInfo: { show }, onHide } = props;
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: '',
            }}
            validate={({ name }) => {
              const errors = {};
              if (!name.trim()) {
                errors.name = 'Required';
              } else if (name.trim().length < 3 || name.trim().length > 20) {
                errors.name = 'Must be 3 to 20 characters';
              }
              return errors;
            }}
            onSubmit={async ({ name }) => {
              await addChannel(name.trim());
              onHide();
            }}
          >
            {({
              handleSubmit,
              handleChange,
              errors,
              values,
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <FormControl
                  name="name"
                  className="mb-2"
                  ref={inputRef}
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                {errors.name && <FormControl.Feedback type="invalid">{errors.name}</FormControl.Feedback>}
                <div className="d-flex justify-content-end">
                  <Button className="mr-2" variant="secondary" disabled={isSubmitting} onClick={onHide}>
                    Close
                  </Button>
                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddChannel;
