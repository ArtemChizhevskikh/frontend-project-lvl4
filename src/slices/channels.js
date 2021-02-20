/* eslint no-param-reassign: "error" */

import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import routes from '../routes.js';

const channels = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    fetchChannels(state, { payload }) {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    },
    newChannel(state, { payload }) {
      const { attributes } = payload;
      state.channels.push(attributes);
    },
    removeChannel(state, { payload }) {
      const { id } = payload;
      state.channels = state.channels.filter((c) => c.id !== id);
      const generalChannel = state.channels.find((c) => c.name === 'general');
      state.currentChannelId = generalChannel.id;
    },
    renameChannel(state, { payload }) {
      const { id, attributes: { name } } = payload;
      const channel = state.channels.find((c) => c.id === id);
      channel.name = name;
    },
    setCurrentChannel(state, { payload }) {
      state.currentChannelId = payload.id;
    },
  },
});

const addChannel = async (name) => {
  const url = routes.channelsPath();
  const data = {
    attributes: {
      name,
    },
  };
  try {
    await axios.post(url, { data });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const removeChannel = async (id) => {
  const url = routes.channelPath(id);
  try {
    await axios.delete(url);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const renameChannel = async (name, id) => {
  const url = routes.channelPath(id);
  const data = {
    attributes: {
      name,
    },
  };
  try {
    await axios.patch(url, { data });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const actions = { ...channels.actions };
export {
  actions, addChannel, removeChannel, renameChannel,
};
export default channels.reducer;
