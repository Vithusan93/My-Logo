import { Button } from "@radix-ui/themes";
import React from "react";

// Position objects at the bottom

const ClassChat = () => {
  const messages = [
    { id: 1, name: "Vithusan", text: "Punda" },
    { id: 2, name: "Narmaraj", text: "Sunni" },
    { id: 3, name: "Rehan", text: "Varthai" },
  ];
  return (
    <div className="flex flex-col justify-end h-full">
      <div className="flex flex-1 flex-col gap-1 justify-start">
        {messages.map((message) => (
          <div
            key={message.id}
            className="bg-blue-200 p-2 rounded-md rounded-tl-none"
          >
            <div className="text-sm font-bold">{message.name}</div>
            <div>{message.text}</div>
          </div>
        ))}
      </div>

      <div className="flex bg-neutral-200 p-4 rounded-xl focus:border-0">
        <input type="text" className="flex-1 bg-neutral-200"></input>
        <Button className="">Send</Button>
      </div>
    </div>
  );
};

export default ClassChat;
