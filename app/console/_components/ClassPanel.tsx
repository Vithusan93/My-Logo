import React, { useContext } from "react";
import { Tabs, Box, Text } from "@radix-ui/themes";
import ClassChat from "./ClassChat";
import { ClassContext } from "@/components/class/ClassContext";

const ClassPanel = () => {
  const logoClass = useContext(ClassContext);
  return (
    <div className="flex flex-col flex-1 bg-neutral-50 rounded-lg overflow-hidden shadow-md h-full">
      <div className="bg-neutral-200 text-center p-2">
        <span className="font-bold">CLASS</span>
      </div>

      {logoClass ? (
        <Tabs.Root defaultValue="chat">
          <Tabs.List>
            <Tabs.Trigger value="tasks">Tasks</Tabs.Trigger>
            <Tabs.Trigger value="members">Members</Tabs.Trigger>
            <Tabs.Trigger value="chat">Chat</Tabs.Trigger>
          </Tabs.List>

          <Box px="4" pt="3" pb="2" grow={"1"} height="100%">
            <Tabs.Content value="tasks"></Tabs.Content>
            <Tabs.Content value="members"></Tabs.Content>
            <Tabs.Content value="chat">
              <ClassChat />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      ) : (
        <div className="text-center p-4">Choose a class</div>
      )}
    </div>
  );
};

export default ClassPanel;
