import { Carousel, CarouselSlide } from '@mantine/carousel';

import { Box, Button, Center, Flex, Group, Image, Paper, Stack, Text, Title, } from "@mantine/core";
import placeholder from "../../../assets/image.png"
import rooms from "../../../data/rooms.json"
import { IconArrowRight, IconTestPipe } from '@tabler/icons-react';
type Props = {
    params: {
        id: string;
    };
};
export default function Room({ params }: Props) {
    console.log(params.id)
    const room = rooms[Number(params.id) - 1]
    console.log(room)
    return (
        <Box>
            <Carousel
                withIndicators
                height={500}
                slideSize={{ base: "100%", md: "33.3333%" }}
                slideGap="md"
                loop
                align="center"
                slidesToScroll={1}
            >
                <CarouselSlide>
                    <Image src={placeholder.src} radius="md" h="100%" />
                </CarouselSlide>
                <CarouselSlide>
                    <Image src={placeholder.src} radius="md" h="100%" />
                </CarouselSlide>
                <CarouselSlide>
                    <Image src={placeholder.src} radius="md" h="100%" />
                </CarouselSlide>
                <CarouselSlide>
                    <Image src={placeholder.src} radius="md" h="100%" />
                </CarouselSlide>
                <CarouselSlide>
                    <Image src={placeholder.src} radius="md" h="100%" />
                </CarouselSlide>
            </Carousel>
            <Paper shadow='md' sx={{ borderTopLeftRadius: 'var(--mantine-radius-xl)', borderTopRightRadius: 'var(--mantine-radius-xl)', position: "relative" }} p="xl" mt={-10} >
                <Flex justify="space-between" align="start" gap="md" >
                    <Group gap={0}>
                        <Title fw="bold" size="lg" order={1}>
                            {room.roomName} -
                        </Title>
                        <Text>{" "}{room.hotelName}</Text>
                    </Group>

                    <Text fw="bold" fz="h2" fs="italic">{room.price}<Text span fs="normal">€/nuit</Text></Text>
                </Flex>
                <Text>{room.description}</Text>
                <Flex align="center" gap="xs" mt="md">
                    <Text size="sm" fw={500}>
                        découvrir l'hôtel
                    </Text>
                    <IconArrowRight size={16} />
                </Flex>
                <Box mt="md">
                    <Title order={2}>Les + de la chambre</Title>
                    <Flex p="lg" gap="xl">
                        <Stack justify="center" gap={5}>
                            <IconTestPipe />
                            Test
                        </Stack>
                        <Stack justify="center" gap={5}>
                            <IconTestPipe />
                            Test
                        </Stack>
                        <Stack justify="center" gap={5}>
                            <IconTestPipe />
                            Test
                        </Stack>
                        <Stack justify="center" gap={5}>
                            <IconTestPipe />
                            Test
                        </Stack>
                    </Flex>
                </Box>
                <Center>
                    <Button mx="auto" color='black'>Faire une proposition !</Button>
                </Center>
            </Paper>
        </Box>
    );
}
