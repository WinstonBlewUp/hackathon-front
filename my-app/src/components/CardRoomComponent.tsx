import { RoomData } from "@/types/category"
import { ActionIcon, BackgroundImage, BackgroundImageProps, Box, Stack, Text } from "@mantine/core"
import { IconHeart } from "@tabler/icons-react"
import placeholder from "../assets/image.png"
import { useSession } from "next-auth/react"


export type CardRoomComponentProps = RoomData & Omit<BackgroundImageProps, 'src'>
export const CardRoomComponent = ({ name, basePrice, id, users, ...props }: CardRoomComponentProps) => {
    const { data: session } = useSession();
    const isLike = false
    if (session) {
        users.some((user) => user.split("/")[2] === session.user.id)
    }
    return (

        <BackgroundImage src={placeholder.src} radius="md" w="100%" h="100%" sx={{ overflow: "hidden" }} {...props} >
            <Box sx={{
                background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.7) 129%)",
                display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "end",
            }} p="xs" h='100%' w="100%">

                <ActionIcon color="gray.3" radius='xl' variant="filled">
                    <IconHeart fill={isLike ? "red" : "none"} />
                </ActionIcon>
                {name && (
                    <Stack gap={0} c="white" w="100%">
                        <Text fw="bold">{name}</Text>
                        <Text>{basePrice}€/nuit</Text>
                    </Stack>
                )}
            </Box>
        </BackgroundImage >

    )
}