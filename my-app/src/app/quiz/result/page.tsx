
import { BackgroundImage, Button, Stack, Text } from "@mantine/core";
import placeholder from "../../../assets/image.png"
export default function QuizResult() {
    return (
        <Stack>
            <Text tt="uppercase" ta="center" size="xl" fw="bold">C'est un Match !</Text>
            <BackgroundImage src={placeholder.src} h={400} radius="lg" sx={{ display: "flex", alignItems: "end" }} p="sm">
                <Stack>
                    <Text>Hotel [nom hotel]</Text>
                </Stack>
            </BackgroundImage>
            <Button>Voir la chambre</Button>
            <Button variant="outline">Regénérer</Button>
        </Stack>
    )
}