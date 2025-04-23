import { ActionIcon, BackgroundImage, BackgroundImageProps, Box, Flex, Stack, Text } from "@mantine/core"
import { IconHeart } from "@tabler/icons-react"

type CardRoomComponentProps = {
    picture: string,
    isLike?: boolean,
    price: number
    name: string
}
export const CardRoomComponent = ({ picture, isLike, price, name, ...props }: CardRoomComponentProps & Omit<BackgroundImageProps, 'src'>) => (
    <BackgroundImage src={picture} radius="md" w="100%" h="100%" sx={{ overflow: "hidden" }} {...props} >
        <Box sx={{
            background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.7) 129%)",
            display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "end",
        }} p="xs" h='100%' w="100%">

            <ActionIcon color="gray.3" radius='xl' variant="filled">
                <IconHeart fill={isLike ? "red" : "none"} />
            </ActionIcon>
            <Stack gap={0} c="white" w="100%">
                <Text fw="bold">{name}</Text>
                <Text>{price}€/nuit</Text>
            </Stack>
        </Box>
    </BackgroundImage >

)