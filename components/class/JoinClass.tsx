"use client";
import React, { useEffect, useState } from "react";
import { Button, Dialog, Flex, TextField, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";

const JoinClass = () => {
  const [joinLink, setJoinLink] = useState("");
  const [openJoin, setOpenJoin] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const joinID = searchParams.get("joinID");
    if (joinID) {
      setJoinLink(joinID);
      setOpenJoin(true);
    }
    console.log(searchParams);
  }, []);

  return (
    <Dialog.Root open={openJoin} onOpenChange={setOpenJoin}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Join Class</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Enter the password to join the class
        </Dialog.Description>
        <form>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                JoinLink
              </Text>
              <TextField.Input placeholder="" value={joinLink} readOnly />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Password
              </Text>
              <TextField.Input placeholder="Password to join the class" />
            </label>
          </Flex>
        </form>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button type="button" onClick={() => {}}>
              Join Class
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default JoinClass;
