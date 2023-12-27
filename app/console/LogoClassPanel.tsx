import { Tabs, Box, Text } from "@radix-ui/themes";
import React from "react";
import LogoClassForm from "./LogoClassForm";
import OwnedClassList from "./OwnedClassList";
import JoinedClasses from "./_components/JoinedClasses";

const LogoClassPanel = () => {
  return (
    <div>
      <Tabs.Root defaultValue="joined">
        <Tabs.List>
          <Tabs.Trigger value="joined">Joined Classes</Tabs.Trigger>
          <Tabs.Trigger value="classes">My Classes</Tabs.Trigger>
          <Tabs.Trigger value="newClass">Create Class</Tabs.Trigger>
        </Tabs.List>

        <Box px="4" pt="3" pb="2">
          <Tabs.Content value="joined">
            <JoinedClasses />
          </Tabs.Content>
          <Tabs.Content value="classes">
            <OwnedClassList />
          </Tabs.Content>
          <Tabs.Content value="newClass">
            <Text size="2">
              <LogoClassForm />
            </Text>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </div>
  );
};

export default LogoClassPanel;
