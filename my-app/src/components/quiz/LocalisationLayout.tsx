import { Box, Card, Chip, Group, SimpleGrid, Slider, Stack, Text, Title } from "@mantine/core"

export const LocalisationLayout = () => {
    const marksPublicTransport = [
        { value: 0, label: "Basse" },
        { value: 25, },
        { value: 50, },
        { value: 75, },
        { value: 100, label: "Haute" },
    ];
    const marksAttraction = [
        { value: 0, label: "Loin" },
        { value: 25, },
        { value: 50, },
        { value: 75, },
        { value: 100, label: "Proche" },
    ];
    return (
        <Stack gap="xl">
            <Box>
                <Title order={2} size="md" mb="md">Type de destination préférée</Title>
                <Chip.Group>
                    <Group >
                        <Chip value="1">Centre ville</Chip>
                        <Chip value="2">Ville - Quartier calme</Chip>
                        <Chip value="3">Loins de tout</Chip>
                    </Group>
                </Chip.Group>
            </Box>
            <Box>
                <Title order={2} size="md" mb="md">Quelle importance accordez-vous à la proximité des transports publics ?</Title>
                <Slider step={25} defaultValue={50} marks={marksPublicTransport}
                />
            </Box>
            <Box>
                <Title order={2} size="md" mb="md">Préférez-vous être proche des attractions touristiques ou dans un endroit plus isolé ?</Title>
                <Slider step={25} defaultValue={50} marks={marksAttraction}
                />
            </Box>
        </Stack>

    )
}