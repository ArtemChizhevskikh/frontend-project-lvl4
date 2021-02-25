import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, FormControl } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import axios from 'axios';
import routes from '../../routes.js';
import { getValidationSchema } from './AddChannel.jsx';

const RenameChannel = (props) => {
  const { modalInfo: { show, item }, onHide } = props;
  const channels = useSelector((state) => state.channelsInfo.channels);
  const channelsNames = channels.map(({ name }) => name);
  const validationSchema = getValidationSchema(channelsNames);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: item.name,
            }}
            validationSchema={validationSchema}
            onSubmit={async ({ name }, { setErrors }) => {
              const url = routes.channelPath(item.id);
              const data = {
                attributes: {
                  name: name.trim(),
                },
              };
              try {
                await axios.patch(url, { data });
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
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RenameChannel;
