import { Box, Stack, Title } from "@mantine/core";
import { CardNegotiation } from "@/components/negotiation/CardNegotiation";
import rooms from "../../../data/rooms.json"
import placeholder from "../../../assets/image.png"
export default function Negotiation() {
    return (
        <>
            <Box w="100%">
                <Title order={2} mb="md">Mes négociations</Title>
                <Stack gap="xl">
                    {rooms.slice(0, 5).map((room, index) =>
                        <CardNegotiation picture={placeholder.src} info={{ name: room.hotelName, price: room.price }} description={room.description} key={index} />
                    )}
                </Stack>
            </Box>
        </>
    );
}
