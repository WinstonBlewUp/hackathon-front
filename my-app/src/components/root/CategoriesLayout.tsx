import { Box, Center, SimpleGrid, Text, Title } from "@mantine/core";
import categories from "../../data/categories.json"
export const CategoriesLayout = () => (
    <Box>
        <Title order={2} mb="md">Trouver votre voyage idéal</Title>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
            {categories.map((category, key) =>
                <Center
                    key={key}
                    w="100%"
                    sx={{
                        borderRadius: "var(--mantine-radius-md)",
                        border: `1px solid var(--mantine-color-gray-3)`
                    }}
                    py="lg"
                >
                    <Text tt="capitalize">{category.name}</Text>
                </Center>
            )}
        </SimpleGrid>
    </Box>
)