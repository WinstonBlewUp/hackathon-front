import { Center, SimpleGrid, Text, } from "@mantine/core";
import categories from "../data/categories.json"
import HomeComponent from "../components/root/home/Home";
// OPEN GDS
export default function Home() {
  return (
    <>

      <HomeComponent />
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
