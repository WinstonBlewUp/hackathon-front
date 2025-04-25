import { RoomData } from "@/types/data"
import { ActionIcon, BackgroundImage, BackgroundImageProps, Box, Stack, Text } from "@mantine/core"
import { IconHeart } from "@tabler/icons-react"
import placeholder from "../assets/image.png"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { getCreateLike } from "@/lib/axios"


export type CardRoomComponentProps = RoomData & Omit<BackgroundImageProps, 'src'>
export const CardRoomComponent = ({ hotelName, roomBasePrice, roomDescription, roomName, hotelId, roomId, roomUsers, roomMaxGuests, ...props }: CardRoomComponentProps) => {
    const { data: session } = useSession();
    let isLike = false
    if (session && roomUsers) {
        isLike = roomUsers.some((user) => user.split("/")[3] === session.user.id)
    }

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();

        const fetchCategories = async () => {
            if (!session) return
            try {
                const response = await getCreateLike({ user_id: session?.user.id, room_id: roomId });
                if (response.success) {
                } else {
                    console.error(response.error)
                }
            } catch (err) {
                console.error(err)
            }
        };

        fetchCategories();
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
                {session?.user && (

                    <ActionIcon color="gray.3" radius='xl' variant="filled" onClick={handleLike}>
                        <IconHeart fill={isLike ? "red" : "none"} />
                    </ActionIcon>
                )}
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