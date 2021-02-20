import React from 'react';
import {
  Nav, NavItem, Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { connect, useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import getModal from './modals';
import { actions as modalActions } from '../slices/modal.js';
import { actions, addChannel } from '../slices/channels.js';

const mapDispatch = { addChannel };

const renderChannels = (channel, currentChannelId, dispatch, showModal) => {
  const { name, id, removable } = channel;
  const { setCurrentChannel } = actions;
  const channelsClassName = cn('nav-link btn-block text-left', {
    'flex-grow-1': removable,
    'mb-2': !removable,
  });
  const toggleButtonClass = (currentChannelId === id) ? 'primary' : 'light';

  if (!removable) {
    return (
      <NavItem key={id} as="li">
        <Button
          onClick={() => dispatch(setCurrentChannel({ id }))}
          variant={toggleButtonClass}
          className={channelsClassName}
        >
          {name}
        </Button>
      </NavItem>
    );
  }
  return (
    <NavItem key={id} as="li">
      <Dropdown as={ButtonGroup} className="d-flex mb-2">
        <Button
          onClick={() => dispatch(setCurrentChannel({ id }))}
          variant={toggleButtonClass}
          className={channelsClassName}
        >
          {name}
        </Button>

        <Dropdown.Toggle split variant={toggleButtonClass} className="flex-grow-0" />
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => showModal('remove', channel)} href="#">Remove</Dropdown.Item>
          <Dropdown.Item onClick={() => showModal('rename', channel)} href="#">Rename</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </NavItem>
  );
};

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.show) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} />;
};

const Channels = () => {
  const { openModal, closeModal } = modalActions;
  const dispatch = useDispatch();
  const hideModal = () => dispatch(closeModal());
  const showModal = (type, item = null) => dispatch(openModal({ type, item }));
  const modalInfo = useSelector((state) => state.modal);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channels = useSelector((state) => state.channels.channels);

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" onClick={() => showModal('add')} className="ml-auto p-0 btn btn-link">+</button>
      </div>
      <Nav fill variant="pills" as="ul" className="flex-column">
        {channels.map((channel) => renderChannels(channel, currentChannelId, dispatch, showModal))}
      </Nav>
      {renderModal({ modalInfo, hideModal })}
    </div>
  );
};

export default connect(
  null,
  mapDispatch,
)(Channels);
