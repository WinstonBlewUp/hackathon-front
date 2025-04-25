import { Button, Stack, Text } from "@mantine/core"
import { CardRoomComponent } from "../CardRoomComponent"
import { QuizRequestData, RoomData } from "@/types/data";
import { useState } from "react";

export const Result = ({ rooms }: { rooms: RoomData[] }) => {
    const [index, setIndex] = useState(0)
    return (
        <Stack>
            <Text tt="uppercase" ta="center" size="xl" fw="bold">C'est un Match !</Text>
            <CardRoomComponent {...rooms[index]} h="65vh" />
            <Button>Voir la chambre</Button>
            <Button variant="outline" onClick={() => setIndex((prev) => prev + 1)}>Regénérer</Button>
        </Stack>
    )
}