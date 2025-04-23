import { ActionIcon, Button, Card, CardSection, Flex, Image, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconBolt } from '@tabler/icons-react';
import rooms from "../../data/rooms.json"
import placeholder from "../../assets/image.png"
import Link from "next/link";
export const FlashLayout = () => {
    return (
        <Stack component='article' align="end">
            <Flex align='baseline' justify='space-between' w='100%'>
                <Title order={2}>
                    Départ de dernière minute ?
                </Title>
                <IconBolt />
            </Flex>
            <SimpleGrid cols={{ base: 1, sm: 3, lg: 5 }} w='100%'>
                {rooms.slice(0, 5).map((room, key) =>
                    <Card key={key} w="100%" shadow="md" component={Link} href={`/room/${room.id}`} sx={{ ["&:hover"]: { transform: "scale(1.1)", zIndex: 10 } }}>
                        <CardSection mb='md' pos='relative'>
                            <ActionIcon top={10} right={10} pos='absolute' radius="xl" >
                                <IconBolt />
                            </ActionIcon>
                            <Image src={placeholder.src} h={175} />
                        </CardSection>
                        <Text>{room.roomName}</Text>
                    </Card>
                )}
            </SimpleGrid>
            <Button w={300} component={Link} href="/room">Voir toutes les ventes flash</Button>
        </Stack>
    )
}