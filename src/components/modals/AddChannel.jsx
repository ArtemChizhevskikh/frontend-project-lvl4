import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Button, Modal, FormControl, FormGroup,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../../routes.js';

export const getValidationSchema = (channelsNames) => yup.object().shape({
  name: yup.string()
    .trim()
    .min(3, 'Must be 3 to 20 characters')
    .max(20, 'Must be 3 to 20 characters')
    .notOneOf(channelsNames, 'Must be unique')
    .required('Required'),
});

const AddChannel = (props) => {
  const { modalInfo: { show }, onHide } = props;
  const channels = useSelector((state) => state.channelsInfo.channels);
  const channelsNames = channels.map(({ name }) => name);
  const validationSchema = getValidationSchema(channelsNames);

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
            validationSchema={validationSchema}
            onSubmit={async ({ name }, { setErrors }) => {
              const url = routes.channelsPath();
              const data = {
                attributes: {
                  name: name.trim(),
                },
              };
              try {
                await axios.post(url, { data });
                onHide();
              } catch (e) {
                setErrors({ name: e.message });
              }
            }}
          >
            {({
              handleChange,
              touched,
              errors,
              values,
              isSubmitting,
            }) => (
              <Form noValidate>
                <FormGroup>
                  <FormControl
                    name="name"
                    className="mb-2"
                    ref={inputRef}
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={touched.name && !!errors.name}
                    autoComplete="off"
                  />
                  {errors.name && touched.name
                  && <FormControl.Feedback type="invalid" className="d-block">{errors.name}</FormControl.Feedback>}
                  <div className="d-flex justify-content-end">
                    <Button className="mr-2" variant="secondary" disabled={isSubmitting} onClick={onHide}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                      Submit
                    </Button>
                  </div>
                </FormGroup>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddChannel;
