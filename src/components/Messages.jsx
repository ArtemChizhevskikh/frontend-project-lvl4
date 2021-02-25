import React, { useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import useStayScrolled from 'react-stay-scrolled';
import InputForm from './InputForm.jsx';

const renderMessages = (messages, ref) => (
  <div ref={ref} id="messages-box" className="chat-messages overflow-auto mb-3">
    {messages.length !== 0 && messages.map(({ id, message, name }) => (
      <div className="text-break" key={id}>
        <b>{name}</b>
        {': '}
        {message}
      </div>
    ))}
  </div>
);

const Messages = () => {
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const messages = useSelector((state) => state.messagesInfo.messages);
  const activeChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const messagesBoxRef = useRef();
  const { stayScrolled } = useStayScrolled(messagesBoxRef);
  useLayoutEffect(() => {
    if (messagesBoxRef.current) {
      stayScrolled();
    }
  }, [activeChannelMessages.length, stayScrolled]);

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        {renderMessages(activeChannelMessages, messagesBoxRef)}
        <InputForm />
      </div>
    </div>
  );
};

export default Messages;
