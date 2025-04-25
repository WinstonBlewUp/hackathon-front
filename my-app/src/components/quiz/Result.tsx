import { Button, Stack, Text } from "@mantine/core"
import { CardRoomComponent } from "../CardRoomComponent"
import placeholder from "../../assets/image.png"
import { QuizRequestData } from "@/types/data";

export const Result = ({ request }: { request: QuizRequestData }) => {

    return (
        <Stack>
            <Text tt="uppercase" ta="center" size="xl" fw="bold">C'est un Match !</Text>
            <CardRoomComponent info={{ price: 100, name: "Novotel" }} picture={placeholder.src} h="65vh" />
            <Button>Voir la chambre</Button>
            <Button variant="outline">Regénérer</Button>
        </Stack>
    )
}