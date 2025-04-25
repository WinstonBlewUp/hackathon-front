import { Box, Title } from "@mantine/core";
import { AllLike } from "@/components/profile/likes/AllLike";
export default function Likes() {

    return (
        <>
            <Box w="100%">
                <Title order={2} mb="lg">Mes favoris</Title>
                <AllLike />
            </Box>
        </>
    );
}
