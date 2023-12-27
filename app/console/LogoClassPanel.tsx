import { ClassContext } from "@/components/class/ClassContext";
import { Box, Tabs, Text } from "@radix-ui/themes";
import { useContext } from "react";
import LogoClassForm from "../../components/class/LogoClassForm";
import JoinedClasses from "../../components/class/JoinedClasses";
import OwnedClassList from "../../components/class/OwnedClassList";

const LogoClassPanel = ({
  onClassChange,
}: {
  onClassChange: (logoClass: any) => void;
}) => {
  const logoClass = useContext(ClassContext);
  return (
    <div className="bg-neutral-50 rounded-lg overflow-hidden shadow-md">
      <div className="bg-neutral-200 text-center p-2">
        <span className="font-bold">CLASS</span>
      </div>
      {logoClass ? (
        <div className="">{logoClass.name}</div>
      ) : (
        <Tabs.Root defaultValue="joined">
          <Tabs.List>
            <Tabs.Trigger value="joined">Joined Classes</Tabs.Trigger>
            <Tabs.Trigger value="classes">My Classes</Tabs.Trigger>
            <Tabs.Trigger value="newClass">Create Class</Tabs.Trigger>
          </Tabs.List>

          <Box px="4" pt="3" pb="2">
            <Tabs.Content value="joined">
              <JoinedClasses onSelect={onClassChange} />
            </Tabs.Content>
            <Tabs.Content value="classes">
              <OwnedClassList onSelect={onClassChange} />
            </Tabs.Content>
            <Tabs.Content value="newClass">
              <Text size="2">
                <LogoClassForm />
              </Text>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      )}
    </div>
  );
};

export default LogoClassPanel;
