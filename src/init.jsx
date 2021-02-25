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

export default ({ channels, messages, currentChannelId }) => {
  const preloadedState = {
    channelsInfo: { channels, currentChannelId },
    messagesInfo: { messages },
  };

  const store = configureStore({
    reducer,
    preloadedState,
  });

  const socket = io();

  socket.on('newChannel', ({ data }) => {
    store.dispatch(actions.newChannel(data));
  });
  socket.on('removeChannel', ({ data }) => {
    store.dispatch(actions.removeChannel(data));
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
