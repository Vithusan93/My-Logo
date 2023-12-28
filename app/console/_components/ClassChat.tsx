"use client";
import { Button } from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import { ClassContext } from "@/components/class/ClassContext";
import { Message, User } from "@prisma/client";

// Position objects at the bottom

interface MessageDetail extends Message {
  sender: User;
}

const ClassChat = () => {
  const logoClass = useContext(ClassContext);

  const [messages, setMessages] = useState<MessageDetail[]>([]);

  const [text, setText] = useState("");

  const sendMessage = async () => {
    if (logoClass) {
      const response = await fetch(`/api/classes/${logoClass.id}/messages`, {
        method: "POST",
        body: JSON.stringify({
          text: text,
        }),
      });
      if (response.status === 201) {
        setText("");
      }
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      if (logoClass) {
        const response = await fetch(`/api/classes/${logoClass.id}/messages`);
        if (response.status === 200) {
          const data = await response.json();
          setMessages(data);
        }
      }
    };
    getMessages();
  }, []);

  return (
    <div className="flex flex-col justify-end h-full">
      <div className="flex flex-1 flex-col gap-1 justify-start">
        {messages.map((message) => (
          <div
            key={message.id}
            className="bg-blue-200 p-2 rounded-md rounded-tl-none"
          >
            <div className="text-sm font-bold">{message.sender.name}</div>
            <div>{message.text}</div>
          </div>
        ))}
      </div>

      <div className="flex bg-neutral-200 p-4 rounded-xl focus:border-0">
        <input
          type="text"
          className="flex-1 bg-neutral-200"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></input>
        <Button className="" onClick={() => sendMessage()}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ClassChat;
