/**
 * eslint-disable no-restricted-globals
 *
 * @format
 */

import React, { useState, useEffect } from "react";
import Messages from "../Messages/Messages";
import TitleBar from "../TitleBar/TitleBar";
import Input from "../Input/Input";
import io from "socket.io-client";
import queryString from "query-string";
import { useAuth } from "@frontegg/react";

const ENDPOINT = "ws://localhost:5000";
let socket;

function Chat() {
  const [chatRoom, setChatRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { user } = useAuth();
  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT, {
      withCredentials: false,
    });
    setChatRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) alert(error);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps, no-restricted-globals
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (socketMessage) => {
      console.log(socketMessage, new Date().getTime());
      setMessages((prevMessages) => [...prevMessages, socketMessage]);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className='outerContainer'>
      <div className='container'>
        <TitleBar room={chatRoom} />
        <Messages messages={messages} name={user.name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
