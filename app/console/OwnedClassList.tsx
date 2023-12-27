import { LogoClass } from "@prisma/client";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

const OwnedClassList = () => {
  const [classes, setClasses] = useState<LogoClass[]>([]);

  useEffect(() => {
    const getClasses = async () => {
      const response = await fetch("/api/classes/");
      if (response.status === 200) {
        const ownedClasses: LogoClass[] = await response.json();
        setClasses(ownedClasses);
      }
    };
    getClasses();
  }, []);

  return (
    <div>
      OwnedClassList
      <div className="">
        {classes.length > 0 ? (
          classes.map((ownedClass) => (
            <Card key={ownedClass.id}>
              <Flex gap="3" align="center">
                <Box>
                  <Text as="div" size="2" weight="bold">
                    {ownedClass.name}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    Joining Link:{" "}
                    {`${process.env.NEXT_PUBLIC_BASE_URL}/${ownedClass.link}`}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    Password:{ownedClass.password}
                  </Text>
                </Box>
              </Flex>
            </Card>
          ))
        ) : (
          <div>You do not have any classes</div>
        )}
      </div>
    </div>
  );
};

export default OwnedClassList;
