import { RoomData } from "@/types/data"
import { ActionIcon, BackgroundImage, BackgroundImageProps, Box, Stack, Text } from "@mantine/core"
import { IconHeart } from "@tabler/icons-react"
import placeholder from "../assets/image.png"
import { useSession } from "next-auth/react"
import Link from "next/link"


export type CardRoomComponentProps = RoomData & Omit<BackgroundImageProps, 'src'>
export const CardRoomComponent = ({ hotelName, roomBasePrice, roomDescription, roomName, hotelId, roomId, roomUsers, roomMaxGuests, ...props }: CardRoomComponentProps) => {
    const { data: session } = useSession();
    let isLike = false
    if (session && roomUsers) {
        isLike = roomUsers.some((user) => user.split("/")[3] === session.user.id)
    }
    return (

        <BackgroundImage src={placeholder.src} radius="md" w="100%" h="100%"
            sx={{
                overflow: "hidden",
                "&:hover": {
                    transform: "scale(1.05)",
                    transition: 'transform 250ms ease',
                }
            }} {...props} component={Link} href={`/room/${roomId}`} >
            <Box sx={{
                background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.7) 129%)",
                display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "end",
            }} p="xs" h='100%' w="100%">

                <ActionIcon color="gray.3" radius='xl' variant="filled">
                    <IconHeart fill={isLike ? "red" : "none"} />
                </ActionIcon>
                {hotelName && (
                    <Stack gap={0} c="white" w="100%">
                        <Text fw="bold">{hotelName}</Text>
                        <Text>{roomBasePrice}€/nuit</Text>
                    </Stack>
                )}
            </Box>
        </BackgroundImage >

    )
}