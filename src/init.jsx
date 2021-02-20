import React from 'react';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import faker from 'faker';
import Cookies from 'js-cookie';
import UserName from './UserNameContext.js';
import reducer, { actions } from './slices';
import App from './components/App.jsx';

export default (props) => {
  const store = configureStore({
    reducer,
  });

  const { channels, messages, currentChannelId } = props;

  const socket = io();

  socket.on('connect', () => {
    const data = {
      channels,
      currentChannelId,
    };
    store.dispatch(actions.fetchChannels(data));
    store.dispatch(actions.fetchState(messages));
  });

  socket.on('newChannel', ({ data }) => {
    store.dispatch(actions.newChannel(data));
  });
  socket.on('removeChannel', ({ data }) => {
    store.dispatch(actions.removeChannel(data));
    store.dispatch(actions.deleteMessages(data));
  });
  socket.on('renameChannel', ({ data }) => {
    store.dispatch(actions.renameChannel(data));
  });
  socket.on('newMessage', ({ data }) => {
    store.dispatch(actions.newMessageChat(data));
  });

  if (!Cookies.get('name')) {
    Cookies.set('name', faker.internet.userName());
  }

  const userName = Cookies.get('name');

  return render(
    <Provider store={store}>
      <UserName.Provider value={userName}>
        <App />
      </UserName.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
