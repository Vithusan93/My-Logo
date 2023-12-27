"use client";
import { useState } from "react";
import CanvasManager from "../CanvasManager";
import ScriptEditor from "./ScriptEditor";
import LogoClassPanel from "./LogoClassPanel";
import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";

export const Console = () => {
  const [activeCommand, setActiveCommand] = useState("");

  return (
    <div className="h-screen">
      <div className="flex w-full h-full justify-between">
        <div className="flex-1 bg-neutral-100  px-2">
          <ScriptEditor onExecute={setActiveCommand} />
        </div>
        <div className="bg-neutral-50  px-2">
          <CanvasManager
            width={800}
            height={600}
            commandInput={activeCommand}
          />
        </div>
        <div className="flex-1 bg-neutral-100  px-2">
          <LogoClassPanel />
        </div>
      </div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Edit profile</Button>
        </Dialog.Trigger>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Make changes to your profile.
          </Dialog.Description>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Input
                defaultValue="Freja Johnsen"
                placeholder="Enter your full name"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Input
                defaultValue="freja@example.com"
                placeholder="Enter your email"
              />
            </label>
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};
