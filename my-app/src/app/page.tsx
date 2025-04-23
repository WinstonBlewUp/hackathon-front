import { Card, CardSection, Center, Flex, Image, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import categories from "../data/categories.json"
import rooms from "../data/rooms.json"
import placeholder from "../assets/image.png"
import { FlashLayout } from "@/components/root/FlashLayout";
// OPEN GDS
export default function Home() {
  return (
    <>
      <FlashLayout />
      <Stack component='article' >
        <Flex align='baseline' justify='space-between'>
          <Title order={2}>
            Nos chambres populaires
          </Title>
        </Flex>
        <SimpleGrid cols={{ base: 1, sm: 3, lg: 5 }}>
          {rooms.slice(0, 5).map((room, key) =>
            <Card key={key} w="100%" shadow="md">
              <CardSection mb='md'>
                <Image src={placeholder.src} h={175} />
              </CardSection>
              <Text>{room.roomName}</Text>
            </Card>
          )}
        </SimpleGrid>
      </Stack>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        {categories.map((category, key) =>
          <Center bg={`${category.color}.3`} w={300} h={300} sx={{ borderRadius: "var(--mantine-radius-md)", }} mx="auto" key={key}>
            <Text tt="capitalize">{category.name}</Text>
          </Center>
        )}
      </SimpleGrid>
    </>
  );
}
