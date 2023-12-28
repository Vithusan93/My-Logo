import { ClassContext } from "@/components/class/ClassContext";
import { Box, Tabs, Text } from "@radix-ui/themes";
import { useContext } from "react";
import LogoClassForm from "./LogoClassForm";
import JoinedClasses from "./JoinedClasses";
import OwnedClassList from "./OwnedClassList";

const LogoClassPanel = () => {
  const logoClass = useContext(ClassContext);
  return (
    <div className="bg-neutral-50 rounded-lg overflow-hidden shadow-md">
      <div className="bg-neutral-200 text-center p-2">
        <span className="font-bold">Manage Class</span>
      </div>
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
