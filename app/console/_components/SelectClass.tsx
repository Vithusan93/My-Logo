"use client";
import { Box, Button, Card, Dialog, Flex, Tabs, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { PublicLogoClass } from "@/components/class/ClassCard";

interface JoinedClasses {
  logoClass: PublicLogoClass;
}

const SelectClass = ({
  selectingClass,
  setSelectingClass,
  onClassSelect,
}: {
  selectingClass: boolean;
  setSelectingClass: (selectingClass: boolean) => void;
  onClassSelect: (logoClass: PublicLogoClass) => void;
}) => {
  const [classes, setClasses] = useState<JoinedClasses[]>([]);
  useEffect(() => {
    const getJoinedClasses = async () => {
      const response = await fetch("/api/classes/join/", { cache: "no-store" });
      if (response.status === 200) {
        const data = await response.json();
        setClasses(data);
      }
    };
    getJoinedClasses();
  }, []);
  return (
    <Dialog.Root open={selectingClass} onOpenChange={setSelectingClass}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Select a Class</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Select a class
        </Dialog.Description>

        <Flex direction="column" gap="3">
          {classes.map((joinedClass) => (
            <Card
              key={joinedClass.logoClass.name}
              onClick={() => {
                onClassSelect(joinedClass.logoClass);
                setSelectingClass(false);
              }}
              className="cursor-pointer"
            >
              <Flex gap="3" align="center">
                <Box>
                  <Text as="div" size="2" weight="bold">
                    {joinedClass.logoClass.name}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    Instructor: {joinedClass.logoClass.instructor.name}
                  </Text>
                </Box>
              </Flex>
            </Card>
          ))}
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default SelectClass;
