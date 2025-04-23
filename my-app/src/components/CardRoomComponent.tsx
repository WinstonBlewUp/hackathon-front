import { ActionIcon, BackgroundImage, Flex, Text } from "@mantine/core"
import { IconHeart } from "@tabler/icons-react"

type CardRoomComponentProps = {
    picture: string,
    isLike: boolean,
    price: number
}

export const CardRoomComponent = ({ picture, isLike, price }: CardRoomComponentProps) => (
    <BackgroundImage src={picture} radius="md">
        <ActionIcon>
            <IconHeart />
        </ActionIcon>
        <Flex>
            <Text>Nom chambre - hotel</Text>
            <Text>{price} €</Text>
        </Flex>
    </BackgroundImage>

)