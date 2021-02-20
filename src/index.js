// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import gon from 'gon';
import run from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const { channels, messages, currentChannelId } = gon;

run({ channels, messages, currentChannelId });
