import { Tabs, Box, Text } from "@radix-ui/themes";
import React from "react";
import LogoClassForm from "./LogoClassForm";
import OwnedClassList from "./OwnedClassList";

const LogoClassPanel = () => {
  return (
    <div>
      <Tabs.Root defaultValue="account">
        <Tabs.List>
          <Tabs.Trigger value="account">My Classes</Tabs.Trigger>
          <Tabs.Trigger value="documents">Join Class</Tabs.Trigger>
          <Tabs.Trigger value="settings">Create Class</Tabs.Trigger>
        </Tabs.List>

        <Box px="4" pt="3" pb="2">
          <Tabs.Content value="account">
            <OwnedClassList />
          </Tabs.Content>

          <Tabs.Content value="documents">
            <Text size="2">Access and update your documents.</Text>
          </Tabs.Content>

          <Tabs.Content value="settings">
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
