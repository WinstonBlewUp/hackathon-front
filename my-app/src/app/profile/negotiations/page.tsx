import { Box, Title } from "@mantine/core";
import { AllNegotiation } from "@/components/negotiation/AllNegotiation";
export default function Negotiation() {
    return (
        <>
            <Box w="100%">
                <Title order={2} mb="md">Mes négociations</Title>
                <AllNegotiation />
            </Box>
        </>
    );
}
