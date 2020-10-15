import Message, {MessageItem, MessageType} from "./Message";
import React, {FC, ReactNode, useEffect, useState} from "react";
import ReactDOM from 'react-dom';

const container = document.createElement("div");
container.id = 'MessageContainer'
if (!document.body.contains(container)) {
  document.body.appendChild(container);
}

interface MessageAdd {
  (content: ReactNode, duration?: number): void;
}

export const message: {
  [index: string]: MessageAdd;
} = {};

const MessageWrapper: FC = () => {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  useEffect(() => {
    const messageTypes:MessageType[] = ["primary", "warning", "danger", "info", "success"];
    messageTypes.forEach((type) => {
      message[type] = (content, duration = 1000) => {
        const newMessage: MessageItem = {
          id: +new Date(),
          type,
          content,
          duration,
        };
        setMessages((prevMessages) => {
          return prevMessages.concat(newMessage)
        });
        setTimeout(() => {
          setMessages((prevMessages) =>
            prevMessages.filter((msg) => msg !== newMessage)
          );
        }, duration);
      };
    });
  }, []);
  return (
    <Message messages={messages} />
  );
};

ReactDOM.render(<MessageWrapper />, container);
