"use client";
import { Button } from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import { ClassContext } from "@/components/class/ClassContext";
import { Message, User } from "@prisma/client";
import { useSession } from "next-auth/react";

import { BiSolidHide, BiSolidShow } from "react-icons/bi";
// Position objects at the bottom

interface MessageDetail extends Message {
  sender: User;
}

const ChatMessage = ({
  message,
  isAdmin,
}: {
  message: MessageDetail;
  isAdmin: boolean;
}) => {
  const toggleMessageVisibility = async () => {
    const data = { isVisible: !message.isVisible };

    fetch(`/api/classes/${message.logoClassId}/messages/${message.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  };

  return (
    <div
      className={`${
        message.isVisible ? "bg-blue-300 " : "bg-gray-300 text-gray-500"
      } p-2 rounded-md `}
    >
      <div className="flex justify-between items-center">
        <div className="font-bold text-sm">{message.sender.name}</div>
        {isAdmin && (
          <div
            className="flex items-center gap-1 hover:bg-gray-200 rounded-md px-1 cursor-pointer"
            onClick={() => {
              toggleMessageVisibility();
            }}
          >
            {message.isVisible ? (
              <>
                <BiSolidHide /> Hide
              </>
            ) : (
              <>
                <BiSolidShow /> Unhide
              </>
            )}
          </div>
        )}
      </div>
      <div>{message.text}</div>
      <div className="flex  w-full items-end justify-end">
        <div className="text-right text-xs">
          {message.sentTime.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

const ClassChat = () => {
  const logoClass = useContext(ClassContext);
  const { data: session } = useSession();

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

    const interval = setInterval(() => {
      getMessages();
    }, 5000);
    return () => clearInterval(interval);
  }, [logoClass]);

  if (!session) {
    return <div>You are not logged in</div>;
  }

  const isAdmin =
    session.user_id === logoClass?.instructor.id ||
    (logoClass?.assistantInstructor
      ? session.user_id === logoClass?.assistantInstructor.id
      : false);

  return (
    <div className=" flex-col justify-end ">
      <div className="flex flex-1 flex-col gap-1 justify-start">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} isAdmin={isAdmin} />
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
