import React from 'react';
import { Button, Modal, FormControl } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import axios from 'axios';
import routes from '../../routes.js';

const RemoveChannel = (props) => {
  const { modalInfo: { show, item }, onHide } = props;
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are your sure?
        </Modal.Body>
        <Formik
          initialValues={{
            name: '',
          }}
          onSubmit={async (values, { setErrors }) => {
            const url = routes.channelPath(item.id);
            try {
              await axios.delete(url);
              onHide();
            } catch (e) {
              setErrors({ name: e.message });
            }
          }}
        >
          {({ handleSubmit, errors, isSubmitting }) => (
            <Modal.Footer as={Form} className="justify-content-between" onSubmit={handleSubmit}>
              {errors.name && <FormControl.Feedback type="invalid" className="d-block">{errors.name}</FormControl.Feedback>}
              <Button variant="secondary" disabled={isSubmitting} onClick={onHide}>
                Cancel
              </Button>
              <Button type="submit" variant="danger" disabled={isSubmitting}>
                Submit
              </Button>
            </Modal.Footer>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default RemoveChannel;
