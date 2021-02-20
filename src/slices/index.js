import { combineReducers } from '@reduxjs/toolkit';
import messagesReducer, { actions as chatActions } from './chat.js';
import channelsReducer, { actions as channelsActions } from './channels.js';
import modalReducer, { actions as modalActions } from './modal.js';

export default combineReducers({
  chat: messagesReducer,
  channels: channelsReducer,
  modal: modalReducer,
});

export const actions = {
  ...chatActions,
  ...channelsActions,
  ...modalActions,
};
