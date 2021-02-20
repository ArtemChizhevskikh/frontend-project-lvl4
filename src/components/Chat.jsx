import React, {
  useContext, useEffect, useRef, useLayoutEffect,
} from 'react';
import { Formik, Form, Field } from 'formik';
import { connect, useSelector } from 'react-redux';
import useStayScrolled from 'react-stay-scrolled';
import { addMessage } from '../slices/chat.js';
import UserName from '../UserNameContext';

const mapDispatch = { addMessage };

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

const NewMessageChat = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.chat.messages);
  const activeChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const userName = useContext(UserName);
  const inputRef = useRef();
  const messagesBoxRef = useRef();
  const { stayScrolled } = useStayScrolled(messagesBoxRef);
  useLayoutEffect(() => {
    if (messagesBoxRef.current) {
      stayScrolled();
    }
  }, [activeChannelMessages.length, stayScrolled]);

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef, currentChannelId]);

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        {renderMessages(activeChannelMessages, messagesBoxRef)}
        <div className="mt-auto">
          <Formik
            initialValues={{
              message: '',
            }}
            onSubmit={async ({ message }, { resetForm }) => {
              if (!message.trim()) {
                return;
              }
              await addMessage({ name: userName, message, currentChannelId });
              resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <div className="input-group">
                    <Field innerRef={inputRef} name="message" aria-label="body" className="mr-2 form-control" />
                    <button aria-label="submit" disabled={isSubmitting} type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  mapDispatch,
)(NewMessageChat);
