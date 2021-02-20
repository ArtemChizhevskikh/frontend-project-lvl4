import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { removeChannel } from '../../slices/channels.js';

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
        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await removeChannel(item.id);
              onHide();
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveChannel;
