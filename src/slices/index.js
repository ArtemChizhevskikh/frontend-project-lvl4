import { combineReducers } from '@reduxjs/toolkit';
import messagesReducer, { actions as messagesActions } from './messages.js';
import channelsReducer, { actions as channelsActions } from './channels.js';
import modalReducer, { actions as modalActions } from './modal.js';

export default combineReducers({
  messagesInfo: messagesReducer,
  channelsInfo: channelsReducer,
  modal: modalReducer,
});

export const actions = {
  ...messagesActions,
  ...channelsActions,
  ...modalActions,
};
