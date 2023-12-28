import { Box, Card, Flex, Text } from "@radix-ui/themes";

export interface PublicLogoClass {
  id: number;
  name: string;
  instructor: { name: string };
}

const ClassCard = ({ logoClass }: { logoClass: PublicLogoClass }) => {
  return (
    <Card>
      <Flex gap="3" align="center">
        <Box>
          <Text as="div" size="2" weight="bold">
            {logoClass.name}
          </Text>
          <Text as="div" size="2" color="gray">
            Instructor: {logoClass.instructor.name}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default ClassCard;
